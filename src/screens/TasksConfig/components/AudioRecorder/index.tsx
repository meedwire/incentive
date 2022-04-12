import React, {useEffect, useMemo, useRef, useState} from 'react';
import Animated, {
  cancelAnimation,
  FadeInUp,
  Keyframe,
  Layout,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IPropsAudioRecorder} from './types';
import {makeStyles} from './styles';
import {IconButton} from '../../../../components';
import {Audio} from 'expo-av';
import {TimeLineAudio} from './components';
import {
  useAudioRecorder,
  useSequenceRepeat,
  useTiming,
} from '../../../../hooks';

const AudioRecorder: React.FC<IPropsAudioRecorder> = ({
  defaultColor,
  onFinishRecorder,
  error,
}) => {
  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);
  const recording = useRef<Audio.Recording>();
  const [timerLimitAudio, setTimerLImitAudio] = useState('00s');
  const timer = useRef<NodeJS.Timer>();
  const {
    startRecording,
    stopRecording,
    recordingInProgress,
    audioUri,
    clearRecording,
  } = useAudioRecorder();
  const [soundPlay, setSoundPlay] = useState(false);

  const lineWidth = useTiming(recordingInProgress, {duration: 10000});
  const scale = useSequenceRepeat(recordingInProgress);

  async function handleStartRecording() {
    try {
      let counter = 1;

      timer.current = setInterval(() => {
        const acc = counter++;
        setTimerLImitAudio(`${acc.toString().padStart(2, '0')}s`);
      }, 1000);

      const uri = await startRecording();
      onFinishRecorder(uri);
      console.log('Recording stopped and stored at', uri);
      cancelAllAnimations();
    } catch (err) {
      console.error('Failed to start recording', err);
      clearAudioRecorded();
    }
  }

  function cancelAllAnimations() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    scale.value = 1;
    lineWidth.value = 0;
    cancelAnimation(lineWidth);
    cancelAnimation(scale);
    scale.value = 1;
    lineWidth.value = 0;
    recording.current = undefined;
  }

  async function handleStopRecording() {
    try {
      const uri = await stopRecording();
      cancelAllAnimations();
      onFinishRecorder(uri);
      console.log('Recording stopped and stored at', uri);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearAudioRecorded() {
    await clearRecording();
    setTimerLImitAudio('00s');
  }

  async function playAudio() {
    if (!audioUri) {
      return null;
    }
    try {
      const {sound} = await Audio.Sound.createAsync({uri: audioUri});
      await sound.playAsync();
      await sound.setVolumeAsync(1);

      setSoundPlay(true);

      sound.setOnPlaybackStatusUpdate(state => {
        //@ts-ignore
        if (!state.isPlaying) {
          setSoundPlay(false);
        }
      });
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
      transform: [{translateX: -100}, {scale: 0}],
    },
    100: {
      opacity: 1,
      transform: [{translateX: 0}, {scale: 1}],
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
            name: recordingInProgress ? 'stop' : 'record-circle',
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
              name: soundPlay ? 'pause' : 'play',
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
              name: 'close',
              color: defaultColor,
            }}
          />
        )}
      </Animated.View>
      {error && (
        <Animated.Text
          layout={Layout}
          entering={FadeInUp}
          style={styles.textError}>
          {error}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export {AudioRecorder};
