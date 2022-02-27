import { getLuminance, shade } from "polished";
import { StyleSheet } from "react-native";
import { getColorCombination } from "../../../../helpers";

export function makeStyles(color?: string) {
  const defaultColor = color || "#dadada";

  return StyleSheet.create({
    container: {
      height: 80,
      marginHorizontal: -16,
      marginVertical: 12,
    },
    containerScroll: {
      alignItems: "center",
    },
    bulletColor: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginHorizontal: 4,
      borderWidth: 0.8,
      elevation: 10,
    },
    textLabel: {
      fontSize: 16,
      marginLeft: 24,
      marginBottom: 4,
      color:
        getLuminance(defaultColor) > 0.4
          ? shade(0.4, defaultColor)
          : defaultColor,
    },
  });
}
