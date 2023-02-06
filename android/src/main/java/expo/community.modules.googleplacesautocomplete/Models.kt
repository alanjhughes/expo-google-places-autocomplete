package expo.community.modules.googleplacesautocomplete

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class PlaceDetails(
    @Field
    val primaryText: String,
    @Field
    val secondaryText: String,
    @Field
    val fullText: String,
    @Field
    val placeId: String,
    @Field
    val distance: Int?,
    @Field
    val types: List<String>
): Record

data class PredictionResult(
    @Field
    val places: List<PlaceDetails>
) : Record

data class DiscoveredPlace(
    @Field
    val name: String?,
    @Field
    val placeId: String?,
    @Field
    val coordinate: Coordinate,
    @Field
    val formattedAddress: String?,
    @Field
    val addressComponents: List<String>?
) : Record

data class Coordinate(
    @Field
    val latitude: Double,
    @Field
    val longitude: Double
) : Record
