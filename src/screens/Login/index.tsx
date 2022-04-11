import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Input, Shape } from "../../components";
import { Canvas, Path } from "@shopify/react-native-skia";

const Login: React.FC = () => {
  return (
    <Canvas style={styles.container}>
      <Input label="E-mail:" />
      <Input label="Senha:" />
    </Canvas>
  );
};

export { Login };
