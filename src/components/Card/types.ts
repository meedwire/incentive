import { ITask } from "../../commonTypes";
import { SharedValue } from "react-native-reanimated";

export interface IPropsCard {
  item: ITask;
  translationX: SharedValue<number>;
}
