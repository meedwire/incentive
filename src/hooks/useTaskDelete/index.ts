import firestore from "@react-native-firebase/firestore";
import { useCallback } from "react";
import { useUserInfo } from "../useUserInfo";

export function useTaskDelete(taskId: string) {
  const { id } = useUserInfo();
  const ref = firestore().collection("users").doc(id).collection("tasks");

  const taskDelete = useCallback(async () => {
    try {
      return ref.doc(taskId).delete();
    } catch (error) {
      console.log(error);
    }
  }, [taskId]);

  return { taskDelete };
}
