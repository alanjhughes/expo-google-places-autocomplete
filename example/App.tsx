import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import {
  GooglePlacesAutocomplete,
  PlacesError,
  PlaceDetails,
} from "expo-google-places-autocomplete";
import { API_KEY } from "@env";

export default function App() {
  const onSearchError = React.useCallback((error: PlacesError) => {
    console.log(error);
  }, []);

  const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
    console.log(place);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: Platform.OS === "ios" ? 44 : 0 }}>
        <Text style={styles.title}>Google Places Autocomplete</Text>
        <GooglePlacesAutocomplete
          apiKey={API_KEY}
          requestConfig={{ countries: ["IE"] }}
          containerStyle={styles.containerStyle}
          onPlaceSelected={onPlaceSelected}
          onSearchError={onSearchError}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    backgroundColor: "rgba(211, 211, 211, 0.3)",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  containerStyle: {
    borderRadius: 5,
    backgroundColor: "white",
  },
});
