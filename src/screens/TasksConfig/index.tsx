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
import { AudioRecorder, ColorScheme, LoadingButton } from "./components";
import { Input } from "../../components";

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
  const recording = useRef<Audio.Recording>();
  const [audioUri, setAudioUri] = useState<string | null | undefined>();
  const [loading, setLoading] = useAsyncState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const randomIndex = Math.floor(Math.random() * colors.length);

  const [defaultColor, setDefaultColor] = useState(
    colors.find((_, i) => i === randomIndex) || "#e8ffed"
  );

  const { handleSubmit, values, setFieldValue, errors, setValues } =
    useFormik<IValues>({
      initialValues: {
        date: new Date(),
        points: 0,
        show: false,
        color: colors.find((_, i) => i === 10),
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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || values.date;
    setShowDatePicker(false);
    setFieldValue("date", currentDate);
    setFieldValue("limitDate", moment(currentDate).format("DD/MM/YYYY"));
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

  return (
    <View style={styles.container}>
      <Input
        label="Objetivo:"
        defaultColor={defaultColor}
        value={values.description}
        error={errors?.description}
        onChangeText={(text) => setFieldValue("description", text)}
      />
      <Input
        label="Premiação:"
        defaultColor={defaultColor}
        value={values.award}
        error={errors?.award}
        onChangeText={(text) => setFieldValue("award", text)}
      />
      <Input
        editable={false}
        defaultColor={defaultColor}
        label="Data limite:"
        onPress={() => setShowDatePicker(true)}
        value={moment(values?.date).format("DD/MM/YYYY")}
        error={errors?.limitDate}
      />
      <AudioRecorder defaultColor={defaultColor} />
      {showDatePicker && (
        <DateTimePicker
          value={values.date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <ColorScheme onChangeColor={(color) => setDefaultColor(color)} />

      <LoadingButton />
    </View>
  );
};

export { TasksConfig };
