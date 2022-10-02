package expo.community.modules.googleplacesautocomplete

import android.os.Bundle
import com.google.android.libraries.places.api.model.AddressComponents

data class PlaceDetails(
    val primaryText: String,
    val secondaryText: String,
    val fullText: String,
    val placeId: String,
    val distance: Int?,
    val types: List<String>
) {
    fun toBundle() = Bundle().apply {
        putString("primaryText", primaryText)
        putString("secondaryText", secondaryText)
        putString("fullText", fullText)
        putString("placeId", placeId)
        putInt("distance", distance ?: -1)
        putStringArray("types", types.toTypedArray())
    }
}

data class DiscoveredPlace(
    val name: String?,
    val placeId: String?,
    val coordinate: Coordinate,
    val formattedAddress: String?,
    val addressComponents: AddressComponents?
) {
    fun toBundle() = Bundle().apply {
        putString("name", name)
        putString("placeId", placeId)
        putBundle("coordinate", coordinate.toBundle())
        putString("formattedAddress", formattedAddress)
        putStringArray(
            "addressComponents",
            addressComponents?.asList()?.map { it.name }?.toTypedArray() ?: emptyArray()
        )
    }
}

data class Coordinate(
    val latitude: Double,
    val longitude: Double
) {
    fun toBundle() = Bundle().apply {
        putDouble("latitude", latitude)
        putDouble("longitude", longitude)
    }
}
