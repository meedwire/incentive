import firestore from "@react-native-firebase/firestore";
import { useUserInfo } from "../useUserInfo";

export function useRating() {
  const { id } = useUserInfo();
  const ref = firestore().collection("users").doc(id).collection("tasks");

  const handleRating = async (id: string, points: number) => {
    return await ref.doc(id).update({ points });
  };

  return { handleRating };
}
