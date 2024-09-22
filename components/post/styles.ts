import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    gap: 24,
  },
  containerInteractions: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  buttonReactions: {
    flexDirection: "row",
    gap: 8,
  },
  fadeGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
  }
});
