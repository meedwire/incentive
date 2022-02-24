import firestore from "@react-native-firebase/firestore";
import { getLuminance, lighten, shade } from "polished";

import { ISnapShot, ITask } from "../commonTypes";
import { useUserInfo } from "../hooks";

export function makeContentSnapShot<T>(snapshot: ISnapShot) {
  let data: T[] = [];

  snapshot.docs.forEach((doc) => {
    if (doc.exists) {
      const item = { ...doc.data(), id: doc.id } as unknown as T;
      data.push(item);
    }
  });

  return data;
}

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export function getColorCombination(color: string) {
  const luminance = getLuminance(color);

  if (between(luminance, 0, 0.3)) return lighten(0.4, color);

  if (between(luminance, 0, 0.5)) return lighten(0.2, color);

  if (between(luminance, 0.5, 0.7)) return shade(0.2, color);

  if (between(luminance, 0.5, 1)) return shade(0.5, color);
}
