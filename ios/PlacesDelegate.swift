import Foundation
import GooglePlaces

protocol PlacesResultHandler {
  func didAutocomplete(with predictions: [GMSAutocompletePrediction])
  func didFailAutocompleteWithError(_ error: Error)
}

internal class PlacesDelegate: NSObject, GMSAutocompleteFetcherDelegate {
  private let resultHandler: PlacesResultHandler

  init(resultHandler: PlacesResultHandler) {
    self.resultHandler = resultHandler
  }

  func didAutocomplete(with predictions: [GMSAutocompletePrediction]) {
    self.resultHandler.didAutocomplete(with: predictions)
  }

  func didFailAutocompleteWithError(_ error: Error) {
    self.resultHandler.didFailAutocompleteWithError(error)
  }
}
