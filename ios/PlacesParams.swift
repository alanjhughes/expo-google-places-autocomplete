//
//  PlacesParams.swift
//  ExpoGooglePlacesAutocomplete
//
//  Created by Alan J Hughes on 01/10/2022.
//

import ExpoModulesCore
import GooglePlaces

internal struct PlacesParams: Record {
    @Field var countries: [String]
    @Field var filterType: String?
}
