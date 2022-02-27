import React from "react";
import { View } from "react-native";
import { makeStyles } from "./styles";

const LoadingButton: React.FC = ({ defaultColor }) => {
  const styles = makeStyles(defaultColro);
  return (
    <TouchableOpacity onPress={() => handleSubmit()} style={styles.container}>
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
  );
};

export { LoadingButton };
