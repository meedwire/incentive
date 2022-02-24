import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  LayoutChangeEvent,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { makeStyles } from "./styles";
import { setIn, useFormik } from "formik";
import * as Yup from "yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { IRouteParams } from "../../routes/app.routes";
import Animated, {
  BounceIn,
  cancelAnimation,
  Easing,
  Keyframe,
  Layout,
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { colors as dataColors } from "../../constants";
import { getLuminance, lighten, shade } from "polished";
import { ITask } from "../../commonTypes";
import { Audio } from "expo-av";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as fs from "expo-file-system";
import { useAsyncState } from "../../hooks";

interface IValues extends ITask {
  date: Date;
  show: boolean;
}

const schema = Yup.object().shape({
  description: Yup.string().required("A descrição é obrigatória"),
  award: Yup.string().required("A premiação é obrigatória"),
  limitDate: Yup.string().required("A data limite é obrigatória"),
});

type IRoute = RouteProp<IRouteParams, "TasksConfig">;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TasksConfig: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<IRoute>();
  const refScrollColors = useRef<FlatList>(null);
  const colors = [...new Set(dataColors)].filter((_, i) => i % 6 === 0);
  const randomIndex = Math.floor(Math.random() * colors.length);
  const [defaultColor, setDefaultColor] = useState(
    colors.find((_, i) => i === randomIndex) || "#e8ffed"
  );
  const recording = useRef<Audio.Recording>();
  const scale = useSharedValue(1);
  const [audioUri, setAudioUri] = useState<string | null | undefined>();
  const lineWidth = useSharedValue(0);
  const timeAudio = useRef<NodeJS.Timer>();
  const [recordInProgress, setRecordInProgress] = useState(false);
  const [timerLimitAudio, setTimerLImitAudio] = useState("00s");
  const timer = useRef<NodeJS.Timer>();
  const [widthAudioLine, setWidthAudioLine] = useState(0);
  const [loading, setLoading] = useAsyncState(false);

  const { handleSubmit, values, setFieldValue, errors, setValues } =
    useFormik<IValues>({
      initialValues: {
        date: new Date(),
        points: 0,
        show: false,
        color: colors.find((_, i) => i === randomIndex),
      } as IValues,
      validationSchema: schema,
      onSubmit: async (data: any) => {
        // const db = getDatabase();
        setLoading(true);
        if (params?.id) {
          if (audioUri) {
            const audioBase64 = await fs.readAsStringAsync(audioUri, {
              encoding: "base64",
            });

            // await update(child(ref(db), params?.id), { ...data, audioBase64 });

            await setLoading(false);

            navigation.navigate("Home");
          } else {
            // await update(child(ref(db), params?.id), data);

            await setLoading(false);

            navigation.navigate("Home");
          }
        } else {
          if (audioUri) {
            const audioBase64 = await fs.readAsStringAsync(audioUri, {
              encoding: "base64",
            });

            // await push(ref(db), { ...data, audioBase64 });

            await setLoading(false);

            navigation.navigate("Home");
          } else {
            // await push(ref(db), { ...data });

            await setLoading(false);

            navigation.navigate("Home");
          }
        }
      },
    });

  const styles = makeStyles(defaultColor);

  useEffect(() => {
    if (refScrollColors.current) {
      setTimeout(() => {
        refScrollColors.current &&
          refScrollColors.current.scrollToIndex({
            index: colors.findIndex((item) => item === values.color),
            viewOffset: Dimensions.get("screen").width / 2 - 22,
          });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  function parseTimeLimit() {}

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || values.date;
    setFieldValue("date", currentDate);
    setFieldValue("limitDate", moment(currentDate).format("DD/MM/YYYY"));
    setFieldValue("show", false);
  };

  const getInitialData = useCallback(
    async (id: string) => {
      try {
        // const data = await getTaskById(id);
        // if (data) {
        //   setValues({
        //     ...data,
        //     date: moment(data.limitDate, "DD/MM/YY").toDate(),
        //     limitDate: data.limitDate,
        //     show: false,
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    },
    [params?.id]
  );

  useEffect(() => {
    if (params?.id) {
      getInitialData(params.id);
    }
  }, [params?.id]);

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

  function onLayout(e: LayoutChangeEvent) {
    setWidthAudioLine(e.nativeEvent.layout.width);
  }

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

  const animatedLine = useAnimatedStyle(() => {
    return {
      width: lineWidth.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Objetivo:</Text>
      <TextInput
        value={values.description}
        onChangeText={(text) => setFieldValue("description", text)}
        style={styles.input}
      />
      {errors?.description && (
        <Text style={styles.textError}>{errors?.description}</Text>
      )}
      <Text style={styles.label}>Premiação:</Text>
      <TextInput
        value={values.award}
        onChangeText={(text) => setFieldValue("award", text)}
        style={styles.input}
      />
      {errors?.award && <Text style={styles.textError}>{errors?.award}</Text>}
      <Text style={styles.label}>Data limite:</Text>
      <TouchableOpacity
        onPress={() => setFieldValue("show", true)}
        style={styles.input}
      >
        <Text>{moment(values?.date).format("DD/MM/YYYY")}</Text>
      </TouchableOpacity>
      {errors?.limitDate && (
        <Text style={styles.textError}>{errors?.limitDate}</Text>
      )}
      <Animated.View
        layout={Layout.duration(1500)}
        style={styles.containerAudioRecorder}
      >
        <AnimatedTouchable
          style={[styles.buttonPlaySound, animatedStyle]}
          onPress={recordInProgress ? stopRecording : startRecording}
        >
          <Icon
            name={recordInProgress ? "stop" : "record-circle"}
            color={defaultColor}
          />
        </AnimatedTouchable>
        {audioUri && (
          <AnimatedTouchable
            layout={Layout}
            entering={keyframe}
            style={[styles.buttonPlaySound, animatedStyle]}
            onPress={playAudio}
          >
            <Icon name="play" color={defaultColor} />
          </AnimatedTouchable>
        )}
        <Animated.Text layout={Layout} style={styles.textTimeRecording}>
          {timerLimitAudio}
        </Animated.Text>
        <Animated.View
          onLayout={onLayout}
          layout={Layout}
          style={styles.indicatorAudio}
        >
          <Animated.View style={[styles.aniimatedLine, animatedLine]} />
        </Animated.View>
        {audioUri && (
          <AnimatedTouchable
            layout={Layout}
            entering={keyframe}
            style={[styles.buttonDiscardAudio, animatedStyle]}
            onPress={clearAudioRecorded}
          >
            <Icon name="close" color={defaultColor} />
          </AnimatedTouchable>
        )}
      </Animated.View>
      {values.show && (
        <DateTimePicker
          value={values.date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.containerColors}>
        <FlatList
          ref={refScrollColors}
          data={colors}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          initialNumToRender={colors.length}
          renderItem={({ item, index }) => (
            <AnimatedTouchable
              layout={Layout}
              entering={BounceIn}
              onPress={() => {
                setDefaultColor(item);
                setFieldValue("color", item);
              }}
              style={[
                styles.color,
                {
                  backgroundColor: item,
                  borderColor: shade(0.2, item),
                  transform: [{ scale: defaultColor === item ? 1 : 0.9 }],
                  elevation: defaultColor === item ? 4 : 2,
                  borderWidth: defaultColor === item ? 3 : 0.5,
                },
              ]}
            />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.buttonSave}
      >
        {loading ? (
          <ActivityIndicator
            size={20}
            color={
              getLuminance(defaultColor) < 0.5
                ? lighten(0.5, defaultColor)
                : shade(0.2, defaultColor)
            }
          />
        ) : (
          <Text style={styles.textButtonSave}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export { TasksConfig };
