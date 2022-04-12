import { SharedValue } from "react-native-reanimated";

export interface IPropsMenuCard {
  translationX: SharedValue<number>;
  handleUpdate: () => void;
  handleDelete: () => void;
}
