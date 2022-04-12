import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

export function useSequenceRepeat(state: boolean, config?: WithTimingConfig) {
  const sequence = useSharedValue(1);

  useEffect(() => {
    if (state) {
      sequence.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: config?.duration || 1000 }),
          withTiming(1, { duration: config?.duration || 1000 })
        ),
        Infinity
      );
    } else {
      sequence.value = withTiming(1, { duration: config?.duration || 1000 });
    }
  }, [state]);

  return sequence;
}
