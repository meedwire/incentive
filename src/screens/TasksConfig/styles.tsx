import { StyleSheet } from "react-native";
import { getLuminance, lighten, shade } from "polished";

export function makeStyles(color: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    label: {
      fontSize: 16,
      marginLeft: 8,
      marginBottom: 4,
    },
    input: {
      borderWidth: 0.6,
      borderColor: color,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
      borderRadius: 32,
      fontSize: 16,
    },
    buttonSave: {
      padding: 16,
      backgroundColor: color,
      borderRadius: 32,
      alignItems: "center",
    },
    textButtonSave: {
      fontSize: 16,
      color:
        getLuminance(color) < 0.5 ? lighten(0.5, color) : shade(0.2, color),
    },
    textError: {
      fontSize: 12,
      color: "#ff6565",
      marginLeft: 8,
      marginTop: -10,
    },
    color: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginHorizontal: 4,
      borderWidth: 0.8,
      elevation: 10,
    },
    containerColors: {
      height: 60,
      marginHorizontal: -16,
    },
    containerScroll: {
      alignItems: "center",
    },
    containerAudioRecorder: {
      padding: 8,
      borderRadius: 32,
      borderWidth: 0.8,
      borderColor: color,
      flexDirection: "row",
      alignItems: "center",
    },
    indicatorAudio: {
      flex: 1,
      height: 5,
      backgroundColor: color,
      borderRadius: 10,
      overflow: "hidden",
      marginRight: 10,
    },
    buttonPlaySound: {
      borderWidth: 0.5,
      borderColor: color,
      borderRadius: 20,
      padding: 8,
      marginRight: 10,
    },
    buttonDiscardAudio: {
      borderWidth: 0.5,
      borderColor: color,
      borderRadius: 20,
      padding: 8,
    },
    aniimatedLine: {
      backgroundColor: shade(0.5, color),
      flex: 1,
      borderRadius: 20,
    },
    textTimeRecording: {
      borderRadius: 20,
      paddingHorizontal: 6,
      borderWidth: 0.3,
      borderColor: color,
      marginRight: 10,
      color: color,
    },
  });
}
