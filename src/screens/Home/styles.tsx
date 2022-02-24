import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 20,
  },
  congratulation: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
});
