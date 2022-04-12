import { TextInputProps } from "react-native";

export interface IPropsInput extends TextInputProps {
  value?: string;
  label: string;
  error?: string;
  defaultColor?: string;
  onPress?: () => void;
}
