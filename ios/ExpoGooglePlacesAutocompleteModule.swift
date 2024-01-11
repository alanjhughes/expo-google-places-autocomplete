import ExpoModulesCore
import GooglePlaces

struct PlacesAutocompleteContext {
  let promise: Promise
  let placesDelegate: PlacesDelegate
}

public class ExpoGooglePlacesAutocompleteModule: Module, PlacesResultHandler {
  private var currentContext: PlacesAutocompleteContext?
  private var fetcher: GMSAutocompleteFetcher!
  private let token = GMSAutocompleteSessionToken.init()
  private let filter = GMSAutocompleteFilter()

  public func definition() -> ModuleDefinition {
    Name("ExpoGooglePlacesAutocomplete")

    OnCreate {
      fetcher = GMSAutocompleteFetcher(filter: filter)
      fetcher.provide(token)
    }

    Function("initPlaces") { (apiKey: String) in
      GMSPlacesClient.provideAPIKey(apiKey)
    }

    AsyncFunction("findPlaces") { (query: String, config: RequestConfig?, promise: Promise) in
      findPlaces(from: query, config: config, promise: promise)
    }.runOnQueue(.main)

    AsyncFunction("placeDetails") { (id: String, promise: Promise) in
      placeDetails(id: id, promise: promise)
    }
  }

  private func findPlaces(from query: String, config: RequestConfig?, promise: Promise) {
    let placesDelegate = PlacesDelegate(resultHandler: self)
    fetcher.delegate = placesDelegate

    currentContext = PlacesAutocompleteContext(promise: promise, placesDelegate: placesDelegate)
    filter.countries = config?.countries ?? []
    fetcher.sourceTextHasChanged(query)
  }

  private func placeDetails(id: String, promise: Promise) {
    let fields: GMSPlaceField = GMSPlaceField(rawValue: UInt(GMSPlaceField.name.rawValue) |
                                              UInt(GMSPlaceField.placeID.rawValue) |
                                              UInt(GMSPlaceField.coordinate.rawValue) |
                                              UInt(GMSPlaceField.formattedAddress.rawValue) |
                                              UInt(GMSPlaceField.addressComponents.rawValue)
    )

    GMSPlacesClient.shared().fetchPlace(fromPlaceID: id, placeFields: fields, sessionToken: nil) { place, error in
      if let error {
        promise.reject(error)
        return
      }

      if let place {
        let result = Mappers.mapFromPlace(place: place)
        promise.resolve(result)
      } else {
        promise.resolve()
      }
    }
  }

  func didAutocomplete(with predictions: [GMSAutocompletePrediction]) {
    guard let promise = self.currentContext?.promise else {
      log.error("PlacesContext has been lost.")
      return
    }

    self.currentContext = nil

    let results = Mappers.mapFromPredictions(predictions: predictions)
    promise.resolve([
      "places": results
    ])
  }

  func didFailAutocompleteWithError(_ error: Error) {
    self.currentContext?.promise.resolve(["places": []])
    self.currentContext = nil
  }
}
