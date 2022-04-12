import React, {useMemo, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated, {
  interpolate,
  Layout,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {makeStyles} from './styles';
import {IPropsTimeLine} from './types';

const TimeLineAudio: React.FC<IPropsTimeLine> = ({
  currentTimer,
  defaultColor,
  lineWidth,
}) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);
  const [widthAudioLine, setWidthAudioLine] = useState(0);

  function onLayout(e: LayoutChangeEvent) {
    setWidthAudioLine(e.nativeEvent.layout.width);
  }

  const animatedLine = useAnimatedStyle(() => {
    return {
      width: interpolate(lineWidth.value, [0, 1], [0, widthAudioLine]),
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
        style={styles.indicatorAudio}>
        <Animated.View style={[styles.animatedLine, animatedLine]} />
      </Animated.View>
    </Animated.View>
  );
};

export {TimeLineAudio};
