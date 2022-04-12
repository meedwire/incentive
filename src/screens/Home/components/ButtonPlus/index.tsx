import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { IProps } from "./types";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import Animated, { BounceInDown, Layout } from "react-native-reanimated";
import { IconButton } from "../../../../components";

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

const ButtonPlus: React.FC<IProps> = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <IconButton
      {...props}
      style={styles.container}
      layout={Layout}
      entering={BounceInDown}
      icon={{ name: "plus", size: 40, color: "#10ff44be" }}
    />
  );
};

export { ButtonPlus };
