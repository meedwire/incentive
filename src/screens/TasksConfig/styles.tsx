import { StyleSheet } from "react-native";
import { getLuminance, lighten, shade } from "polished";

export function makeStyles(color: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    textButtonSave: {
      fontSize: 16,
      color:
        getLuminance(color) < 0.5 ? lighten(0.5, color) : shade(0.2, color),
    },
  });
}
