import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "./styles";
import { IProps } from "./types";

const LabelCard: React.FC<IProps> = ({ label, value, cardColor, style }) => {
  const styles = makeStyles(cardColor);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export { LabelCard };
