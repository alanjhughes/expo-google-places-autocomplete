import GooglePlaces

struct Mappers {

  static func mapFromPlace(place: GMSPlace) -> [String: Any?] {
    [
      "name": place.name,
      "placeId": place.placeID,
      "coordinate": Mappers.mapFromCoordinate(coordinate: place.coordinate),
      "formattedAddress": place.formattedAddress,
      "addressComponents": place.addressComponents.map({ comp in
        comp.map {
          $0.name
        }
      }) ?? []
    ]
  }

  static func mapFromCoordinate(coordinate: CLLocationCoordinate2D) -> [String: Any] {
    [
      "latitude": coordinate.latitude,
      "longitude": coordinate.longitude
    ]
  }

  static func mapFromPredictions(predictions: [GMSAutocompletePrediction]) -> [[String: Any]] {
    predictions.map { pred in mapFromPrediction(prediction: pred)}
  }

  static func mapFromPrediction(prediction: GMSAutocompletePrediction) -> [String: Any] {
    [
      "primaryText": prediction.attributedPrimaryText.string,
      "secondaryText": prediction.attributedSecondaryText?.string ?? "",
      "fullText": prediction.attributedFullText.string,
      "placeId": prediction.placeID,
      "distance": prediction.distanceMeters ?? NSNull(),
      "types": prediction.types,
      "description": prediction.description
    ]
  }
}
