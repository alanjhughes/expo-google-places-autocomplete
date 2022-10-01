import ExpoModulesCore
import GooglePlaces

struct Context {
    let promise: Promise
    let placesDelegate: PlacesDelegate
}

public class ExpoGooglePlacesAutocompleteModule: Module, PlacesResultHandler {
    private var currentContext: Context? = nil
    let token = GMSAutocompleteSessionToken.init()
    var fetcher: GMSAutocompleteFetcher!
    var callback: RCTResponseSenderBlock? = nil
    private let filter = GMSAutocompleteFilter()
    
    public func definition() -> ModuleDefinition {
        Name("ExpoGooglePlacesAutocomplete")
        
        OnCreate() {
            self.fetcher = GMSAutocompleteFetcher(filter: self.filter)
            self.fetcher.provide(self.token)
        }
        
        AsyncFunction("initPlaces") { (apiKey: String) in
            print("init places sdk")
            GMSPlacesClient.provideAPIKey(apiKey)
        }
        
        AsyncFunction("findPlaces") { (query: String, params: PlacesParams, promise: Promise) in
            self.findPlaces(from: query, params: params, promise: promise)
        }
        
        AsyncFunction("placeDetails") { (id: String, promise: Promise) in
            self.placeDetails(id: id, promise: promise)
        }
    }
    
    private func findPlaces(from query: String, params: PlacesParams?, promise: Promise) {
        
        let placesDelegate = PlacesDelegate(resultHandler: self)
        fetcher.delegate = placesDelegate
        
        self.currentContext = Context(promise: promise, placesDelegate: placesDelegate)
        
        if let params {
            filter.countries = params.countries
        } else {
            filter.countries = []
        }
        
        DispatchQueue.main.async { [weak self] in
            self?.fetcher.sourceTextHasChanged(query)
        }
        
    }
    
    private func placeDetails(id: String, promise: Promise) {
        let fields: GMSPlaceField = GMSPlaceField(rawValue: UInt(GMSPlaceField.name.rawValue) |
                                                  UInt(GMSPlaceField.placeID.rawValue) |
                                                  UInt(GMSPlaceField.coordinate.rawValue) |
                                                  UInt(GMSPlaceField.formattedAddress.rawValue) |
                                                  UInt(GMSPlaceField.addressComponents.rawValue)
        )
        DispatchQueue.main.async {
            GMSPlacesClient.shared().fetchPlace(fromPlaceID: id, placeFields: fields, sessionToken: nil) { place, error in
                if let error = error {
                    promise.reject(error)
                    return
                }
                
                if let place = place {
                    let result = Mappers.mapFromPlace(place: place)
                    promise.resolve([
                        "cancelled": false,
                        "items": result
                    ])
                }
            }
        }
    }
    
    func didAutocomplete(with predictions: [GMSAutocompletePrediction]) {
        guard let promise = self.currentContext?.promise
        else {
            NSLog("Picking operation context has been lost.")
            return
        }
        
        self.currentContext = nil
        
        let results = Mappers.mapFromPredictions(predictions: predictions)
        promise.resolve([
            "cancelled": false,
            "items": results
        ])
    }
    
    func didFailAutocompleteWithError(_ error: Error) {
        self.currentContext?.promise.resolve(["error": error.localizedDescription])
    }
}

