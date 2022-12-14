package expo.community.modules.googleplacesautocomplete

import android.content.Context
import android.os.Bundle
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.AutocompleteSessionToken
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.net.FetchPlaceRequest
import com.google.android.libraries.places.api.net.FindAutocompletePredictionsRequest
import com.google.android.libraries.places.api.net.PlacesClient
import expo.modules.kotlin.Promise
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoGooglePlacesAutocompleteModule : Module() {
    private lateinit var placesClient: PlacesClient
    private val token = AutocompleteSessionToken.newInstance()
    private val request =
        FindAutocompletePredictionsRequest.builder()
            .setSessionToken(token)

    override fun definition() = ModuleDefinition {
        Name("ExpoGooglePlacesAutocomplete")

        Function("initPlaces") { apiKey: String ->
            Places.initialize(context, apiKey)
            placesClient = Places.createClient(context)
        }

        AsyncFunction("findPlaces") { query: String, config: RequestConfig?, promise: Promise ->
            findPlaces(query, config, promise)
        }

        AsyncFunction("placeDetails") { placeId: String, promise: Promise ->
            placeDetails(placeId, promise)
        }
    }

    val context: Context
        get() = requireNotNull(appContext.reactContext) { "React Application Context is null" }

    private fun findPlaces(query: String, config: RequestConfig?, promise: Promise) {
        request.query = query
        request.countries = config?.countries ?: emptyList()

        placesClient.findAutocompletePredictions(request.build())
            .addOnSuccessListener { response ->
                val bundle = Bundle()
                val places =
                    response.autocompletePredictions.map { mapFromPrediction(it) }.toTypedArray()
                bundle.putParcelableArray("places", places)
                promise.resolve(bundle)
            }
            .addOnFailureListener {
                promise.reject(
                    code = "Failed to fetch places",
                    message = it.message,
                    cause = it.cause
                )
            }
    }

    private fun placeDetails(placeId: String, promise: Promise) {
        val placeFields = listOf(
            Place.Field.ID,
            Place.Field.NAME,
            Place.Field.LAT_LNG,
            Place.Field.ADDRESS,
            Place.Field.ADDRESS_COMPONENTS
        )

        val request = FetchPlaceRequest.newInstance(placeId, placeFields)

        placesClient.fetchPlace(request)
            .addOnSuccessListener { response ->
                val place = mapFromPlace(response.place)
                promise.resolve(place)
            }
            .addOnFailureListener {
                promise.reject(
                    code = "Failed to fetch place details",
                    message = it.message,
                    cause = it.cause
                )
            }
    }
}
