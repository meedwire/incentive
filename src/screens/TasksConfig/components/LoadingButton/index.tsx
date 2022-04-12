import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { getColorCombination } from "../../../../helpers";
import { makeStyles } from "./styles";
import { IPropsButtonLoading } from "./types";

const LoadingButton: React.FC<IPropsButtonLoading> = ({
  defaultColor,
  onPress,
  loading,
}) => {
  const styles = makeStyles(defaultColor);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={20}
          color={getColorCombination(defaultColor || "#dadada")}
        />
      ) : (
        <Text style={styles.textButtonSave}>Salvar</Text>
      )}
    </TouchableOpacity>
  );
};

export { LoadingButton };
