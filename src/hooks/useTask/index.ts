import firestore from "@react-native-firebase/firestore";
import { useCallback } from "react";
import { ITask } from "../../commonTypes";
import { useUserInfo } from "../useUserInfo";

export function useTask() {
  const db = firestore();
  const { id: userId } = useUserInfo();

  const ref = db.collection("users").doc(userId).collection("tasks");

  const getById = useCallback(async (taskId: string) => {
    try {
      const snapShot = await ref.doc(taskId).get();

      if (snapShot.exists) {
        return snapShot.data() as ITask;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const update = async (taskId: string, data: ITask) => {
    await ref.doc(taskId).update({
      color: data.color,
      award: data.award,
      description: data.description,
      limitDate: data.limitDate,
      points: data.points,
      audioBase64: data.audioBase64,
    });
  };

  const save = async (data: ITask) => {
    await ref.doc().set({
      color: data.color,
      award: data.award,
      description: data.description,
      limitDate: data.limitDate,
      points: data.points,
      audioBase64: data.audioBase64,
    });
  };

  return { getById, update, save };
}
