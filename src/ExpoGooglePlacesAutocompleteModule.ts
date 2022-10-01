import { requireNativeModule } from "expo-modules-core";
import { Place, PlaceDetails } from "./types";
import { RequestConfig } from "./types/RequestConfig";

interface ExpoGooglePlacesAutocompleteModule {
  initPlaces: (apikey: string) => void;
  findPlaces: (
    query: string,
    config?: RequestConfig,
  ) => Promise<{ cancelled: boolean; items: Place[] }>;
  placeDetails: (placeId: String) => Promise<PlaceDetails>;
}

export default requireNativeModule(
  "ExpoGooglePlacesAutocomplete",
) as ExpoGooglePlacesAutocompleteModule;
