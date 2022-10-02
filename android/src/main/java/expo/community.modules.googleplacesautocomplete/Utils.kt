package expo.community.modules.googleplacesautocomplete

import com.google.android.gms.maps.model.LatLng
import com.google.android.libraries.places.api.model.AutocompletePrediction
import com.google.android.libraries.places.api.model.Place

internal fun mapFromPlace(place: Place) = DiscoveredPlace(
    name = place.name,
    placeId = place.id,
    coordinate = mapFromCoordinate(place.latLng),
    formattedAddress = place.address,
    addressComponents = place.addressComponents
).toBundle()

internal fun mapFromCoordinate(coordinate: LatLng?) = Coordinate(
    latitude = coordinate?.latitude ?: 0.0,
    longitude = coordinate?.longitude ?: 0.0
)

internal fun mapFromPrediction(prediction: AutocompletePrediction) = PlaceDetails(
    primaryText = prediction.getPrimaryText(null).toString(),
    secondaryText = prediction.getSecondaryText(null).toString(),
    fullText = prediction.getFullText(null).toString(),
    placeId = prediction.placeId,
    distance = prediction.distanceMeters,
    types = prediction.placeTypes.map { it.name }
).toBundle()







