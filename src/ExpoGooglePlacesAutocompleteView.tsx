import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SearchInput, Prediction, ListFooter } from "./components";
import PlacesAutocomplete from "./ExpoGooglePlacesAutocompleteModule";
import { Place, PlacesError } from "./types";
import { GooglePlacesAutocompleteProps } from "./types/GooglePlacesAutocompleteProps";

export default function ExpoGooglePlacesAutocompleteView({
  apiKey,
  placeholder,
  requestConfig,
  onPlaceSelected,
  onSearchError,
  inputRef,
  containerStyle,
  searchInputStyle,
  inputContainerStyle,
  resultsContainerStyle,
  resultItemStyle,
  listFooterStyle,
}: GooglePlacesAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [predictions, setPredictions] = React.useState<Place[]>([]);

  React.useEffect(() => {
    PlacesAutocomplete.initPlaces(apiKey);
  }, [apiKey]);

  const onSelectPlace = React.useCallback(
    async (placeId: string, fullText: string) => {
      try {
        const details = await PlacesAutocomplete.placeDetails(placeId);
        setInputValue(fullText);
        setPredictions([]);
        onPlaceSelected(details);
      } catch (e) {
        const error = e as PlacesError;
        onSearchError?.(error);
      }
    },
    [onPlaceSelected, onSearchError],
  );

  const onChangeText = React.useCallback(
    async (text: string) => {
      try {
        let result = await PlacesAutocomplete.findPlaces(text, requestConfig);
        setPredictions(result.places);
        setInputValue(text);
      } catch (e) {
        const error = e as PlacesError;
        onSearchError?.(error);
      }
    },
    [requestConfig],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <SearchInput
        ref={inputRef}
        inputValue={inputValue}
        style={searchInputStyle}
        inputContainerStyle={inputContainerStyle}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search for your address..."}
        clearButtonMode="while-editing"
      />
      {predictions.length > 0 ? (
        <View style={resultsContainerStyle}>
          {predictions.map(prediction => (
            <Prediction
              key={prediction.placeId}
              place={prediction}
              style={resultItemStyle}
              onSelectPlace={() =>
                onSelectPlace(prediction.placeId, prediction.fullText)
              }
            />
          ))}
          <ListFooter style={listFooterStyle} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
