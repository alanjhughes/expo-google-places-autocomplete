import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SearchInput, ResultItem, ListFooter } from "./components";
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
  const [results, setResults] = React.useState<Place[]>([]);

  React.useEffect(() => {
    PlacesAutocomplete.initPlaces(apiKey);
  }, [apiKey]);

  const onSelectPlace = React.useCallback(
    async (placeId: string, fullText: string) => {
      try {
        const details = await PlacesAutocomplete.placeDetails(placeId);
        setInputValue(fullText);
        setResults([]);
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
        setResults(result.places);
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
      {results.length > 0 ? (
        <View style={resultsContainerStyle}>
          {results.map(place => (
            <ResultItem
              key={place.placeId}
              place={place}
              style={resultItemStyle}
              onSelectPlace={() => onSelectPlace(place.placeId, place.fullText)}
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
