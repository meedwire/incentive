import { StyleSheet } from "react-native";
import { getLuminance, lighten, shade } from "polished";

export function makeStyles(color: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
  });
}
