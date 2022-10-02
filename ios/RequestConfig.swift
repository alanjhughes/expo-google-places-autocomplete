//
//  PlacesParams.swift
//  ExpoGooglePlacesAutocomplete
//
//  Created by Alan J Hughes on 01/10/2022.
//

import ExpoModulesCore
import GooglePlaces

internal struct RequestConfig: Record {
    @Field var countries: [String]
}
