export interface IPropsAudioRecorder {
  defaultColor?: string;
  onFinishRecorder: (audioUri: string | null | undefined) => void;
  error?: string;
}
