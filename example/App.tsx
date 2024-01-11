import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  GooglePlacesAutocomplete,
  PlacesError,
  PlaceDetails,
} from "expo-google-places-autocomplete";
import { StatusBar } from "expo-status-bar";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

export default function App() {
  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const onSearchError = React.useCallback((error: PlacesError) => {
    console.log(error);
  }, []);

  const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
    setPlace(place);
    console.log(place);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={{ marginTop: 44 }}>
        <Text style={styles.title}>Google Places Autocomplete</Text>
        <GooglePlacesAutocomplete
          apiKey={API_KEY}
          requestConfig={{ countries: ["IE"] }}
          containerStyle={styles.containerStyle}
          onPlaceSelected={onPlaceSelected}
          onSearchError={onSearchError}
        />
        <Text>{place ? JSON.stringify(place, null, 2) : ""}</Text>
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
  },
});
