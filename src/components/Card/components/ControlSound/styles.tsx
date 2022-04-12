import { getLuminance, lighten, shade } from "polished";
import { StyleSheet } from "react-native";

export function makeStyles(color?: string) {
  const defaultColor = "#e8ffed";

  const borderColor =
    getLuminance(color || defaultColor) < 0.5
      ? lighten(0.4, color || defaultColor)
      : shade(0.3, color || defaultColor);

  return StyleSheet.create({
    container: {
      padding: 8,
      flexDirection: "row",
      borderWidth: 0.5,
      borderRadius: 32,
      borderColor,
      marginTop: 8,
      alignItems: "center",
      marginBottom: 8,
    },
    buttonPlayStop: {
      padding: 8,
      borderRadius: 40,
      borderWidth: 0.2,
      alignSelf: "flex-start",
      borderColor,
      marginRight: 12,
    },
    indicatorAudio: {
      flex: 1,
      height: 5,
      borderRadius: 20,
      backgroundColor:
        getLuminance(color || defaultColor) < 0.5
          ? lighten(0.5, color || defaultColor)
          : shade(0.1, color || defaultColor),
      elevation: 2,
      marginRight: 16,
    },
    textAudioDuration: {
      marginRight: 12,
      color: borderColor,
    },
    currentStatusAudio: {
      backgroundColor: borderColor,
      height: "100%",
      borderRadius: 10,
    },
  });
}
