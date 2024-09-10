import * as React from "react";
import type { TextInputProps, ViewStyle } from "react-native";
import { View, TextInput, StyleSheet } from "react-native";
interface SearchInputProps extends TextInputProps {
  inputValue: string;
  inputContainerStyle?: ViewStyle;
  onChangeText: (text: string) => void;
}

export const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  function Input(
    { inputValue, onChangeText, inputContainerStyle, style, ...props },
    ref
  ) {
    return (
      <View style={[styles.container, inputContainerStyle]}>
        <TextInput
          ref={ref}
          defaultValue={inputValue}
          onChangeText={onChangeText}
          style={[styles.textField, style]}
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textField: {
    backgroundColor: "gainsboro",
    borderRadius: 5,
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
});
