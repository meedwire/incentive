import { LayoutChangeEvent } from "react-native";
import { SharedValue } from "react-native-reanimated";

export interface IPropsTimeLine {
  currentTimer: string;
  defaultColor?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  lineWidth: SharedValue<number>;
}
