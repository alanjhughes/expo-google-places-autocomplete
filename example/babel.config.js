const path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // For development, we want to alias the library to the source
            "expo-google-places-autocomplete": path.join(
              __dirname,
              "..",
              "src",
              "ExpoGooglePlacesAutocomplete.ts",
            ),
          },
        },
      ],
    ],
  };
};
