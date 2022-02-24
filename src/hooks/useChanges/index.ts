import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ITask } from "../../commonTypes";
import { makeContentSnapShot } from "../../helpers";

type IRef =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

export function useChanges({ ref }: { ref?: IRef }) {
  const [tasks, setTasks] = useState<ITask[] | undefined>();

  if (!ref) {
    return undefined;
  }

  useEffect(() => {
    const subscriber = ref.onSnapshot((snapShot) =>
      setTasks(makeContentSnapShot(snapShot))
    );

    return () => {
      subscriber();
    };
  }, []);

  return tasks;
}
