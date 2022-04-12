import { getLuminance, shade } from "polished";
import { StyleSheet } from "react-native";
import { getColorCombination } from "../../helpers";

export function makeStyles(color?: string) {
  const defaultColor = color || "#dadada";

  return StyleSheet.create({
    container: {},
    textLabel: {
      fontSize: 16,
      marginLeft: 8,
      marginBottom: 4,
      color:
        getLuminance(defaultColor) > 0.4
          ? shade(0.4, defaultColor)
          : defaultColor,
    },
    textInput: {
      borderWidth: 0.6,
      borderColor: defaultColor,
      paddingHorizontal: 16,
      paddingVertical: 6,
      marginBottom: 16,
      borderRadius: 32,
      fontSize: 16,
    },
    textError: {
      fontSize: 12,
      color: "#ff6565",
      marginLeft: 8,
      marginTop: -10,
    },
  });
}
