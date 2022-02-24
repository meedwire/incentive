import { getLuminance, lighten, shade } from "polished";
import { StyleSheet } from "react-native";

export function makeStyles(color?: string) {
  const defaultColor = "#e8ffed";

  return StyleSheet.create({
    starAnimation: {
      ...StyleSheet.absoluteFillObject,
    },
  });
}
