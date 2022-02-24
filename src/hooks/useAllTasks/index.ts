import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useChanges } from "../useChanges";
import { useUserInfo } from "../useUserInfo";
import { ITask } from "../../commonTypes";
import { makeContentSnapShot } from "../../helpers";

type IReturnAllTasks = [boolean, ITask[] | undefined];

export function useAllTasks(changes?: boolean): IReturnAllTasks {
  const { id } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ITask[] | undefined>();
  const ref = firestore().collection("users").doc(id).collection("tasks");
  const tasksChanges = useChanges({ ref: changes ? ref : undefined });

  const getData = useCallback(async () => {
    const snapShot = await ref.get();

    setLoading(false);

    setData(makeContentSnapShot(snapShot));
  }, [id]);

  useEffect(() => {
    if (tasksChanges) {
      setData(tasksChanges);
    }
  }, [tasksChanges]);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return [loading, data];
}
