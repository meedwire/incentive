import { StyleSheet } from "react-native";
import { getColorCombination } from "../../../../helpers";

export function makeStyles(color: string) {
  return StyleSheet.create({
    container: {},
    label: {
      fontSize: 16,
      fontWeight: "700",
      color: getColorCombination(color),
    },
    value: {
      color: getColorCombination(color),
    },
  });
}
