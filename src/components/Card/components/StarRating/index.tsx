import React from "react";
import { View } from "react-native";
import { Star } from "../../../Star";
import { IProps } from "./types";
import styles from "./styles";
import { BounceInRight } from "react-native-reanimated";

const StarRating: React.FC<IProps> = ({
  cardColor,
  numberStarsActive,
  handlePressStar,
}) => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, i) => (
        <Star
          color={cardColor}
          key={i.toString()}
          onPress={() => handlePressStar(i)}
          isActive={i + 1 <= numberStarsActive}
          entering={BounceInRight.delay(i * 100)}
        />
      ))}
    </View>
  );
};

export { StarRating };
