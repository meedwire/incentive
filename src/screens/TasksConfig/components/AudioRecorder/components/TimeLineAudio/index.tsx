import React, { useMemo } from "react";
import { View } from "react-native";
import Animated, { Layout, useAnimatedStyle } from "react-native-reanimated";
import { makeStyles } from "./styles";
import { IPropsTimeLine } from "./types";

const TimeLineAudio: React.FC<IPropsTimeLine> = ({
  currentTimer,
  defaultColor,
  onLayout,
  lineWidth,
}) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);

  const animatedLine = useAnimatedStyle(() => {
    return {
      width: lineWidth.value,
    };
  });

  return (
    <Animated.View layout={Layout} style={styles.container}>
      <Animated.Text layout={Layout} style={styles.textTimeRecording}>
        {currentTimer}
      </Animated.Text>
      <Animated.View
        onLayout={onLayout}
        layout={Layout}
        style={styles.indicatorAudio}
      >
        <Animated.View style={[styles.animatedLine, animatedLine]} />
      </Animated.View>
    </Animated.View>
  );
};

export { TimeLineAudio };
