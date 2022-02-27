import React, { useEffect, useMemo, useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  cancelAnimation,
  Keyframe,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AnimatedTouchable } from "../../../../components/AnimatedTouchable";
import { IPropsAudioRecorder } from "./types";
import { makeStyles } from "./styles";
import { IconButton } from "../../../../components";
import { Audio } from "expo-av";
import { TimeLineAudio } from "./components";

const AudioRecorder: React.FC<IPropsAudioRecorder> = ({ defaultColor }) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);
  const [widthAudioLine, setWidthAudioLine] = useState(0);
  const lineWidth = useSharedValue(0);
  const scale = useSharedValue(1);
  const recording = useRef<Audio.Recording>();
  const [audioUri, setAudioUri] = useState<string | null | undefined>();
  const [recordInProgress, setRecordInProgress] = useState(false);
  const [timerLimitAudio, setTimerLImitAudio] = useState("00s");
  const timeAudio = useRef<NodeJS.Timer>();
  const timer = useRef<NodeJS.Timer>();

  function onLayout(e: LayoutChangeEvent) {
    setWidthAudioLine(e.nativeEvent.layout.width);
  }

  async function startRecording() {
    try {
      setRecordInProgress(true);

      if (audioUri) {
        await clearAudioRecorded();
      }

      let counter = 1;

      timer.current = setInterval(() => {
        const acc = counter++;
        setTimerLImitAudio(`${acc.toString().padStart(2, "0")}s`);
      }, 1000);

      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
      console.log("Starting recording..");
      const { recording: audioInstance } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      recording.current = audioInstance;

      console.log("Recording started");

      lineWidth.value = withTiming(widthAudioLine, {
        duration: 10000,
      });

      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        Infinity
      );

      timeAudio.current = setTimeout(() => {
        stopRecording();
      }, 10000);
    } catch (err) {
      setRecordInProgress(false);
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      setRecordInProgress(false);
      if (timeAudio.current) {
        clearTimeout(timeAudio.current);
      }

      if (timer.current) {
        clearInterval(timer.current);
      }

      cancelAnimation(lineWidth);

      console.log("Stopping recording..");

      await recording.current?.stopAndUnloadAsync();
      const uri = recording.current?.getURI();

      recording.current = undefined;

      console.log("Recording stopped and stored at", uri);
      setAudioUri(uri);
      cancelAnimation(scale);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearAudioRecorded() {
    await stopRecording();

    setAudioUri(undefined);
    lineWidth.value = 0;
    setTimerLImitAudio("00s");
  }

  async function playAudio() {
    if (!audioUri) {
      return null;
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

      await sound.playAsync();
    } catch (error) {}
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
          onPress={recordInProgress ? stopRecording : startRecording}
          style={[styles.buttonPlaySound, animatedStyle]}
          icon={{
            name: recordInProgress ? "stop" : "record-circle",
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
          onLayout={onLayout}
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
