import { StyleSheet } from "react-native";
import { getColorCombination } from "../../helpers";

export function makeStyle(color?: string) {
  const defaultColor = "#e8ffed";

  return StyleSheet.create({
    container: {
      padding: 16,
      marginBottom: 6,
      borderRadius: 8,
      backgroundColor: color || defaultColor,
      shadowColor: "#006e0b80",
      overflow: "hidden",
      shadowOffset: {
        height: 2,
        width: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    imageMonster: {
      position: "absolute",
      right: 0,
      width: 120,
      height: 120,
      bottom: 0,
    },
    textLimitDate: {
      position: "absolute",
      right: 16,
      top: 16,
      color: getColorCombination(color || defaultColor),
    },
  });
}
