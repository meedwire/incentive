import React from "react";
import { View } from "react-native";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { IconButton } from "../../../../../../components";
import styles from "./styles";
import { IPropsMenuCard } from "./types";

const MenuCard: React.FC<IPropsMenuCard> = ({
  translationX,
  handleDelete,
  handleUpdate,
}) => {
  const styleButton = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationX.value, [0, -100], [0, 1]),
      transform: [
        {
          scale: interpolate(
            translationX.value,
            [0, -100],
            [0, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <IconButton
        style={[styles.button, styles.buttonDelete, styleButton]}
        onPress={handleDelete}
        icon={{ name: "trash-can", color: "#ffdada", size: 30 }}
      />
      <IconButton
        style={[styles.button, styles.buttonEdit, styleButton]}
        onPress={handleUpdate}
        icon={{ name: "pencil", color: "#fff317", size: 30 }}
      />
    </View>
  );
};

export { MenuCard };
