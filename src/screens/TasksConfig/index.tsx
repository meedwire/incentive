import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  AndroidMode,
} from "@react-native-community/datetimepicker";

import styles from "./styles";
import { getDatabase, push, ref, set } from "firebase/database";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

interface IValues {
  description?: string;
  award?: string;
  points?: number;
  limitDate?: string;
  date: Date;
  show: boolean;
}

const schema = Yup.object().shape({
  description: Yup.string().required("A descrição é obrigatória"),
  award: Yup.string().required("A premiação é obrigatória"),
  limitDate: Yup.string().required("A data limite é obrigatória"),
});

const TasksConfig: React.FC = () => {
  const navigation = useNavigation();
  const { handleSubmit, values, setFieldValue, errors } = useFormik<IValues>({
    initialValues: {
      date: new Date(),
      points: 0,
      show: false,
    },
    validationSchema: schema,
    onSubmit: (data: any) => {
      const db = getDatabase();
      push(ref(db), data).then(() => {
        navigation.navigate("Home");
      });
    },
  });

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || values.date;
    setFieldValue("date", currentDate);
    setFieldValue("limitDate", currentDate.toLocaleDateString());
    setFieldValue("show", false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Objetivo:</Text>
      <TextInput
        onChangeText={(text) => setFieldValue("description", text)}
        style={styles.input}
      />
      {errors?.description && (
        <Text style={styles.textError}>{errors?.description}</Text>
      )}
      <Text style={styles.label}>Premiação:</Text>
      <TextInput
        onChangeText={(text) => setFieldValue("award", text)}
        style={styles.input}
      />
      {errors?.award && <Text style={styles.textError}>{errors?.award}</Text>}
      <Text style={styles.label}>Data limite:</Text>
      <TouchableOpacity
        onPress={() => setFieldValue("show", true)}
        style={styles.input}
      >
        <Text>{values.date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {errors?.limitDate && (
        <Text style={styles.textError}>{errors?.limitDate}</Text>
      )}
      {values.show && (
        <DateTimePicker
          value={values.date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.buttonSave}
      >
        <Text style={styles.textButtonSave}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export { TasksConfig };
