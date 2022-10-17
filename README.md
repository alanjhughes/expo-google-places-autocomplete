# expo-google-places-autocomplete

Google Places Autocomplete for React Native

# Installation

```sh
npx expo install expo-google-places-autocomplete
```

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

## Configuration for iOS 🍏

> This is only required for usage in bare React Native apps.

Run `npx pod-install` after installing the npm package.

## Configuration for Android 🤖

No further steps are needed on Android

## Usage

```js
import { GooglePlacesAutocomplete } from "expo-google-places-autocomplete";

// ...
const onSearchError = React.useCallback((error: PlacesError) => {
  console.log(error);
}, []);

const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
  console.log(place);
}, []);

<View>
  <GooglePlacesAutocomplete
    apiKey={API_KEY}
    requestConfig={{ countries: ["IE"] }}
    onPlaceSelected={onPlaceSelected}
    onSearchError={onSearchError}
  />
</View>;
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
