import type { TextInput, ViewProps, ViewStyle } from 'react-native';
import type { PlacesError } from './Error';
import type { PlaceDetails } from './PlaceDetails';
import type { RequestConfig } from './RequestConfig';

export interface GooglePlacesAutocompleteProps extends ViewProps {
  /**
   * Your Google Place Api Key
   */
  apiKey: string;

  /**
   * Ref for the TextInput
   *
   */
  inputRef?: React.Ref<TextInput>;

  /**
   * The configuration of your search query
   */
  requestConfig?: RequestConfig;

  /**
   * Placeholder value for the TextInput
   */
  placeholder?: string;

  /**
   * Callback when the user selects a place from the result list. Receives a PlaceDetails object
   */
  onPlaceSelected: (details: PlaceDetails) => void;

  /**
   * Callback when an error occurs while fetching the results or retreiving place details. Receives an error message.
   */
  onSearchError?: (error: PlacesError) => void;

  /**
   * The container of the results list
   */
  resultsContainerStyle?: ViewStyle;

  /**
   * The style of the result items
   */
  resultItemStyle?: ViewStyle;
}
