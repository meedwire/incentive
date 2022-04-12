import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Audio } from "expo-av";

export interface ITask {
  id?: string;
  description: string;
  award: string;
  points: number;
  limitDate: string;
  color: string;
  audioBase64?: string;
}

export interface IPlaybackStatus {
  isLoaded: true;
  androidImplementation?: string;
  uri: string;
  progressUpdateIntervalMillis: number;
  durationMillis?: number;
  positionMillis: number;
  playableDurationMillis?: number;
  seekMillisToleranceBefore?: number;
  seekMillisToleranceAfter?: number;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  didJustFinish: boolean;
}

export type ISnapShot =
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;
