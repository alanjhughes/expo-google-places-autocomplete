import { StyleSheet, View, Image, ViewProps } from "react-native";

interface ListFooterProps extends ViewProps {}

export function ListFooter({ style }: ListFooterProps) {
  return (
    <View style={[styles.contianer, style]}>
      <Image
        source={require("../assets/powered_by_google_on_white.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    padding: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  logo: {
    width: 150,
    height: 20,
    resizeMode: "contain",
  },
});
