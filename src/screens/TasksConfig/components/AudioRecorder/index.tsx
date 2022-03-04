import React, { useEffect, useMemo, useRef, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import Animated, {
  cancelAnimation,
  Keyframe,
  Layout,
  set,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { IPropsAudioRecorder } from "./types";
import { makeStyles } from "./styles";
import { IconButton } from "../../../../components";
import { Audio } from "expo-av";
import { TimeLineAudio } from "./components";
import {
  useAudioRecorder,
  useSequenceRepeat,
  useTiming,
} from "../../../../hooks";

const AudioRecorder: React.FC<IPropsAudioRecorder> = ({ defaultColor }) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);
  const recording = useRef<Audio.Recording>();
  const [timerLimitAudio, setTimerLImitAudio] = useState("00s");
  const timer = useRef<NodeJS.Timer>();
  const {
    startRecording,
    stopRecording,
    recordingInProgress,
    audioUri,
    clearRecording,
  } = useAudioRecorder();

  const lineWidth = useTiming(recordingInProgress, { duration: 10000 });
  const scale = useSequenceRepeat(recordingInProgress);

  useEffect(() => {
    console.log(recordingInProgress);
  }, [recordingInProgress]);

  async function handleStartRecording() {
    try {
      let counter = 1;

      timer.current = setInterval(() => {
        const acc = counter++;
        setTimerLImitAudio(`${acc.toString().padStart(2, "0")}s`);
      }, 1000);

      await startRecording();
      handleStopRecording();
    } catch (err) {
      console.error("Failed to start recording", err);
      clearAudioRecorded();
    }
  }

  async function handleStopRecording() {
    try {
      console.log("Roudou aqui");
      if (timer.current) {
        clearInterval(timer.current);
      }

      const uri = await stopRecording();

      cancelAnimation(lineWidth);
      cancelAnimation(scale);

      scale.value = 1;

      lineWidth.value = 0;

      recording.current = undefined;

      console.log("Recording stopped and stored at", uri);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearAudioRecorded() {
    await clearRecording();
    setTimerLImitAudio("00s");
  }

  async function playAudio() {
    console.log(audioUri);
    if (!audioUri) {
      return null;
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

      await sound.playAsync();
      await sound.setVolumeAsync(1);

      console.log("AUdio is loaded", sound._loaded);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const keyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: -100 }, { scale: 0 }],
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { scale: 1 }],
    },
  });

  return (
    <Animated.View layout={Layout} style={styles.container}>
      <Animated.Text style={styles.textLabel}>Audio: </Animated.Text>
      <Animated.View style={styles.containerAudioRecorder}>
        <IconButton
          activeOpacity={1}
          onPress={
            recordingInProgress ? handleStopRecording : handleStartRecording
          }
          style={[styles.buttonPlaySound, animatedStyle]}
          icon={{
            name: recordingInProgress ? "stop" : "record-circle",
            color: defaultColor,
          }}
        />
        {audioUri && (
          <IconButton
            layout={Layout}
            entering={keyframe}
            onPress={playAudio}
            style={[styles.buttonPlaySound, animatedStyle]}
            icon={{
              name: "play",
              color: defaultColor,
            }}
          />
        )}
        <TimeLineAudio
          currentTimer={timerLimitAudio}
          defaultColor={defaultColor}
          lineWidth={lineWidth}
        />
        {audioUri && (
          <IconButton
            layout={Layout}
            entering={keyframe}
            onPress={clearAudioRecorded}
            style={[styles.buttonDiscardAudio, animatedStyle]}
            icon={{
              name: "close",
              color: defaultColor,
            }}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export { AudioRecorder };
