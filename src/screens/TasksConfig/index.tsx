import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { makeStyles } from "./styles";
import { setIn, useFormik } from "formik";
import * as Yup from "yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { IRouteParams } from "../../routes/app.routes";
import Animated from "react-native-reanimated";
import { colors as dataColors } from "../../constants";
import { ITask } from "../../commonTypes";
import { Audio } from "expo-av";
import * as fs from "expo-file-system";
import { useAsyncState, useTask } from "../../hooks";
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
  audioBase64: Yup.string().required("O Audio é obrigatória"),
});

type IRoute = RouteProp<IRouteParams, "TasksConfig">;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TasksConfig: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<IRoute>();
  const colors = [...new Set(dataColors)].filter((_, i) => i % 6 === 0);
  const [loading, setLoading] = useAsyncState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { getById, save, update } = useTask();

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
        setLoading(true);
        if (params?.id) {
          await update(params.id, { ...data, color: defaultColor });
        } else {
          await save({ ...data, color: defaultColor });
        }

        navigation.goBack();
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
        const data = await getById(id);

        if (data) {
          setValues({
            ...data,
            date: moment(data.limitDate, "DD/MM/YY").toDate(),
            limitDate: data.limitDate,
            show: false,
          });
          setDefaultColor(data.color);
        }
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

  async function getAudioBase64(uri: string | null | undefined) {
    try {
      if (!uri) {
        return;
      }

      const audioBase64 = await fs.readAsStringAsync(uri, {
        encoding: "base64",
      });

      setFieldValue("audioBase64", audioBase64);
    } catch (error) {
      console.log(error);
    }
  }

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
      <AudioRecorder
        defaultColor={defaultColor}
        onFinishRecorder={getAudioBase64}
        error={errors.audioBase64}
      />
      {showDatePicker && (
        <DateTimePicker
          value={values.date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <ColorScheme
        defaultColor={defaultColor}
        onChangeColor={(color) => setDefaultColor(color)}
      />

      <LoadingButton
        loading={loading}
        defaultColor={defaultColor}
        onPress={handleSubmit}
      />
    </View>
  );
};

export { TasksConfig };
