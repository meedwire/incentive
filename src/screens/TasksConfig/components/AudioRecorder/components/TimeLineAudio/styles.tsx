import { shade } from "polished";
import { StyleSheet } from "react-native";

export function makeStyles(color?: string) {
  const defaultColor = color || "#dadada";

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    textTimeRecording: {
      borderRadius: 20,
      paddingHorizontal: 6,
      borderWidth: 0.3,
      borderColor: defaultColor,
      marginRight: 10,
      color: color,
    },
    indicatorAudio: {
      height: 5,
      flex: 1,
      backgroundColor: defaultColor,
      borderRadius: 10,
      overflow: "hidden",
      marginRight: 10,
    },
    animatedLine: {
      backgroundColor: shade(0.5, defaultColor),
      flex: 1,
      borderRadius: 20,
    },
  });
}
