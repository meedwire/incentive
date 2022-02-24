import { TouchableOpacityProps } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { AnimateProps } from "react-native-reanimated";

export interface IProps extends AnimateProps<TouchableOpacityProps> {
  icon: React.ComponentProps<typeof Icon>;
}
