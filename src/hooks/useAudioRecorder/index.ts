import { Audio } from "expo-av";
import { useCallback, useRef, useState } from "react";
import { useAsyncState } from "../useStateAsync";

export function useAudioRecorder(maxSizeRecording?: number) {
  const timeOutRefRecording = useRef<NodeJS.Timeout>();
  const refRecording =
    useRef<{ recording: Audio.Recording; status: Audio.RecordingStatus }>();
  const [audioUri, setAudioUri] = useState<string | null | undefined>();
  const [recordingInProgress, setRecordingInProgress] = useAsyncState(false);
  const refResolve = useRef<(value: string | null | undefined) => void>(
    () => null
  );

  const getPermission = async () => {
    try {
      await Audio.requestPermissionsAsync();
    } catch (error) {
      throw new Error("Permission Audio is required");
    }
  };

  const setAudioOptions = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      throw new Error("Error in configure audio");
    }
  };

  const timeOutAudioRecording = () => {
    timeOutRefRecording.current = setTimeout(() => {
      stopRecording();
    }, 10000);
  };

  const startRecording = useCallback(async () => {
    try {
      if (refRecording.current?.status.isRecording) {
        await stopRecording();
      }

      console.log("Requesting permissions..");
      await getPermission();
      await setAudioOptions();

      console.log("Starting recording..");

      refRecording.current = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecordingInProgress(true);

      timeOutAudioRecording();

      return new Promise<string | null | undefined>((resolve) => {
        refResolve.current = resolve;
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      await setRecordingInProgress(false);

      if (refRecording.current?.status.isRecording) {
        await refRecording.current?.recording?.stopAndUnloadAsync();
      }
      const uri = refRecording.current?.recording.getURI() || audioUri;

      setAudioUri(uri);
      refResolve.current(uri);

      if (timeOutRefRecording.current) {
        clearTimeout(timeOutRefRecording.current);
      }

      return uri;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clearRecording = useCallback(async () => {
    refRecording.current = undefined;

    setAudioUri(undefined);

    setRecordingInProgress(false);
  }, []);

  return {
    startRecording,
    stopRecording,
    recordingInProgress,
    audioUri,
    clearRecording,
  };
}
