import { getLuminance, shade } from "polished";
import { StyleSheet } from "react-native";

export function makeStyles(color?: string) {
  const defaultColor = color || "#dadada";

  return StyleSheet.create({
    container: {},
    containerAudioRecorder: {
      padding: 8,
      borderRadius: 32,
      borderWidth: 0.8,
      borderColor: defaultColor,
      flexDirection: "row",
      alignItems: "center",
    },
    buttonPlaySound: {
      borderWidth: 0.5,
      borderColor: defaultColor,
      borderRadius: 20,
      padding: 8,
      marginRight: 10,
    },
    buttonDiscardAudio: {
      borderWidth: 0.5,
      borderColor: defaultColor,
      borderRadius: 20,
      padding: 8,
    },
    textLabel: {
      fontSize: 16,
      marginLeft: 8,
      marginBottom: 4,
      color:
        getLuminance(defaultColor) > 0.4
          ? shade(0.4, defaultColor)
          : defaultColor,
    },
    textError: {
      fontSize: 12,
      color: "#ff6565",
      marginLeft: 8,
      marginTop: 10,
    },
  });
}
