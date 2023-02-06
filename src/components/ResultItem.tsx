import * as React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import type { Place } from "../types";

interface PredictionProps {
  place: Place;
  onSelectPlace: () => void;
  style?: ViewStyle;
}

export function Prediction({ place, onSelectPlace, style }: PredictionProps) {
  return (
    <Pressable
      style={{ ...defaultStyles.container, ...style }}
      onPress={onSelectPlace}
    >
      {({ pressed }) => (
        <Text style={[defaultStyles.primary, { opacity: pressed ? 0.5 : 1 }]}>
          {place.primaryText}{" "}
          <Text style={defaultStyles.secondary}>{place.secondaryText}</Text>{" "}
        </Text>
      )}
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  primary: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondary: {
    fontSize: 16,
    fontWeight: "normal",
  },
});
