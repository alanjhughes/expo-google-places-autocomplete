# expo-google-places-autocomplete

Google Places Autocomplete for React Native

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-google-places-autocomplete
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.

### Configure for Android

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
