import GooglePlaces

class Mappers {
    
    class func mapFromPlace(place: GMSPlace) -> [String: Any] {
        [
            "name": place.name ?? NSNull(),
            "placeId": place.placeID ?? NSNull(),
            "coordinate": Mappers.mapFromCoordinate(coordinate: place.coordinate),
            "formattedAddress": place.formattedAddress ?? NSNull()
        ]
    }
    
    class func mapFromCoordinate(coordinate: CLLocationCoordinate2D) -> [String: Any] {
        ["latitude": coordinate.latitude, "longitude": coordinate.longitude]
    }
    
    class func mapFromPredictions(predictions: [GMSAutocompletePrediction]) -> [[String: Any]] {
        predictions.map { pred in mapFromPrediction(prediction: pred)}
    }
    
    class func mapFromPrediction(prediction: GMSAutocompletePrediction) -> [String: Any] {
        [
            "primaryText": prediction.attributedPrimaryText.string,
            "secondaryText": prediction.attributedSecondaryText?.string ?? "",
            "fullText": prediction.attributedFullText.string,
            "placeId": prediction.placeID,
            "distance": prediction.distanceMeters ?? NSNull(),
            "types": prediction.types
        ]
        
    }
}
