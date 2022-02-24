import React, { ComponentClass } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import styles from "./styles";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { AnimateProps, AnimateStyle } from "react-native-reanimated";

interface Props
  extends ComponentClass<AnimateProps<TouchableOpacityProps>, any> {
  text?: string;
  icon?: React.ComponentProps<typeof Icon>;
  style?: StyleProp<AnimateStyle<TouchableOpacityProps>>;
}

const ButtonView = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<Props> = ({ text, icon, children, style, ...props }) => {
  return (
    <ButtonView style={[styles.container, style]} {...props}>
      {text && <Text>{text}</Text>}
      {children}
      {icon && <Icon {...icon} />}
    </ButtonView>
  );
};

export { Button };
