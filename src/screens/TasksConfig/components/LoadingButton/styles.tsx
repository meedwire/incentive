import { StyleSheet } from "react-native";
import { getColorCombination } from "../../../../helpers";

export function makeStyles(color?: string) {
  const defaultColor = color || "#dadada";

  return StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: defaultColor,
      borderRadius: 32,
      alignItems: "center",
    },
    textButtonSave: {
      fontSize: 16,
      color: getColorCombination(defaultColor),
    },
  });
}
