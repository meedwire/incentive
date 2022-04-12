import { ViewProps } from "react-native";

export interface IProps extends ViewProps {
  label: string;
  value: string;
  cardColor: string;
}
