import React, { useMemo } from "react";
import { Pressable, Text, TextInput } from "react-native";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { AnimatedTouchable } from "../AnimatedTouchable";
import { makeStyles } from "./styles";
import { IPropsInput } from "./types";

const Input: React.FC<IPropsInput> = ({
  label,
  style,
  error,
  defaultColor,
  onPress,
  ...props
}) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);

  return (
    <Animated.View layout={Layout} style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <AnimatedTouchable
        layout={Layout}
        disabled={typeof onPress !== "function"}
        activeOpacity={typeof onPress !== "function" ? 1 : 0.2}
        onPress={onPress}
      >
        <TextInput {...props} style={[styles.textInput, style]} />
      </AnimatedTouchable>
      {error && (
        <Animated.Text
          layout={Layout}
          entering={FadeInUp}
          style={styles.textError}
        >
          {error}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export { Input };
