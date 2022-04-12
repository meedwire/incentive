import React, { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Animated, { Layout } from "react-native-reanimated";
import { getLuminance, lighten, shade } from "polished";

interface Props {
  onPress?: () => void;
  isActive?: boolean;
  color?: string;
  entering: ComponentProps<typeof AnimatedTouchable>["entering"];
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Star: React.FC<Props> = ({ onPress, isActive, color, entering }) => {
  const defaultActiveColor = "#bdff15";
  return (
    <AnimatedTouchable layout={Layout} entering={entering} onPress={onPress}>
      <Icon
        name="star"
        size={30}
        color={
          isActive
            ? getLuminance(color || defaultActiveColor) < 0.5
              ? lighten(0.2, color || defaultActiveColor)
              : shade(0.8, color || defaultActiveColor)
            : getLuminance(color || defaultActiveColor) < 0.5
            ? shade(0.5, color || defaultActiveColor)
            : shade(0.3, color || defaultActiveColor)
        }
      />
    </AnimatedTouchable>
  );
};

export { Star };
