import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { LabelCard, ControlSound, StarRating } from "./components";
import Monster1 from "../../../assets/Animations/monster-1.json";
import { makeStyle } from "./styles";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { IPropsCard } from "./types";
import { useRating } from "../../hooks";

const Card: React.FC<IPropsCard> = ({ item, translationX }) => {
  const styles = makeStyle(item?.color);
  const textLimitDate = `Data limite: ${item.limitDate}`;
  const { handleRating } = useRating();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
        {
          scale: interpolate(
            translationX.value,
            [0, -100],
            [1, 0.75],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function checkPoinsToRating(index: number) {
    if (index === 0 && item.points === 0) return index + 1;

    if (index === 0 && item.points === 1) return index;

    return index + 1;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LottieView autoPlay style={styles.imageMonster} source={Monster1} />
      <Text style={styles.textLimitDate}>{textLimitDate}</Text>
      <LabelCard
        label="Tarefa:"
        value={item.description}
        cardColor={item.color}
      />
      <LabelCard
        label="Recompensa:"
        value={item.award}
        cardColor={item.color}
      />
      <ControlSound defaultColor={item.color} audioBase64={item?.audioBase64} />
      <StarRating
        cardColor={item.color}
        numberStarsActive={item.points}
        handlePressStar={(index) =>
          handleRating(item.id, checkPoinsToRating(index))
        }
      />
    </Animated.View>
  );
};

export { Card };

// {enableAnimation && (
//   <LottieView
//     autoPlay
//     loop={false}
//     style={styles.starAnimation}
//     onAnimationFinish={() => setEnableAnimation(false)}
//     source={Monster1}
//   />
// )}
