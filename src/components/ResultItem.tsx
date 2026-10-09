import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import type { Place } from "../types";

interface PredictionProps {
  place: Place;
  onSelectPlace: () => void;
  style?: ViewStyle;
  primaryTextStyle?: TextStyle;
  secondaryTextStyle?: TextStyle;
}

export function Prediction({ place, onSelectPlace, style, primaryTextStyle, secondaryTextStyle }: PredictionProps) {
  return (
    <Pressable
      style={{ ...defaultStyles.container, ...style }}
      onPress={onSelectPlace}
    >
      {({ pressed }) => (
        <Text style={{ opacity: pressed ? 0.5 : 1 }}>
          <Text style={[defaultStyles.primary, primaryTextStyle]}>
            {place.primaryText}{"\n"}
          </Text>
          <Text style={[defaultStyles.secondary, secondaryTextStyle]}>
            {place.secondaryText}
          </Text>
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
