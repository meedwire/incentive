import React from "react";
import { AnimatedTouchable } from "../AnimatedTouchable";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { IProps } from "./types";

const IconButton: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <AnimatedTouchable style={[styles.container, props.style]} {...props}>
      <Icon {...icon} />
    </AnimatedTouchable>
  );
};

export { IconButton };
