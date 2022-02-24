import React, { useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as fs from "expo-file-system";
import { makeStyles } from "./styles";
import { Audio } from "expo-av";
import { IPlaybackStatus } from "../../../../commonTypes";
import { shade } from "polished";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  audioBase64?: string;
  defaultColor?: string;
}

const ControlSound: React.FC<Props> = ({ audioBase64, defaultColor }) => {
  const [soundPlaybackStatus, setSoundPlaybackStatus] = useState<
    IPlaybackStatus | undefined
  >();
  const [widthStatusSound, setWidthStatusSound] = useState(0);
  const styles = makeStyles(defaultColor);
  const animatedWidth = useSharedValue(0);
  const currentSound = useRef<Audio.Sound>();

  const saveAudioIncache = useCallback(async () => {
    try {
      if (!audioBase64) {
        return;
      }

      const path = fs.cacheDirectory + `${Math.random().toString(16)}.mp4`;

      await fs.writeAsStringAsync(path, audioBase64, {
        encoding: "base64",
      });

      const { sound } = await Audio.Sound.createAsync({ uri: path });

      sound.setOnPlaybackStatusUpdate((v) => {
        //@ts-ignore
        if (!v.isPlaying) {
          animatedWidth.value = 0;
          if (currentSound.current) currentSound.current.stopAsync();
        }
        //@ts-ignore
        setSoundPlaybackStatus((prev) => ({ ...prev, ...v }));
      });

      currentSound.current = sound;
    } catch (error) {
      console.log("Failed save audio in cache directory");
    }
  }, []);

  useEffect(() => {
    saveAudioIncache();
  }, []);

  async function playSound() {
    try {
      animatedWidth.value = withTiming(widthStatusSound, {
        duration: soundPlaybackStatus?.durationMillis,
      });

      if (currentSound.current) await currentSound.current.playAsync();
    } catch (error) {}
  }

  function onLayout(e: LayoutChangeEvent) {
    setWidthStatusSound(e.nativeEvent.layout.width);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));

  if (!audioBase64) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound} style={styles.buttonPlayStop}>
        <Icon
          name={soundPlaybackStatus?.isPlaying ? "stop" : "play"}
          size={20}
          color={shade(0.5, defaultColor || "#e8ffed")}
        />
      </TouchableOpacity>
      {soundPlaybackStatus?.durationMillis && (
        <Text style={styles.textAudioDuration}>
          {`${Math.floor(
            (soundPlaybackStatus?.durationMillis -
              soundPlaybackStatus.positionMillis) /
              1000
          )
            .toString()
            .padStart(2, "0")}s`}
        </Text>
      )}
      <View onLayout={onLayout} style={styles.indicatorAudio}>
        <Animated.View style={[animatedStyle, styles.currentStatusAudio]} />
      </View>
    </View>
  );
};

export { ControlSound };
