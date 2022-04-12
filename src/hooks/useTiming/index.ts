import { useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

export const useTiming = (state: boolean, config?: WithTimingConfig) => {
  const value = useSharedValue(0);
  useEffect(() => {
    if (state) {
      value.value = withTiming(1, config);
    } else {
      value.value = withTiming(0, config);
    }
  }, [state]);

  return value;
};
