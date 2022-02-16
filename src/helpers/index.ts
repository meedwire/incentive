import { child, get, getDatabase, ref } from "firebase/database";

export function getAllData() {
  return new Promise<any[]>((resolve, reject) => {
    const dbRef = ref(getDatabase());
    const data: any[] = [];
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(
            ([key, value]: [key: string, value: any]) => {
              data.push({ ...value, id: key });
            }
          );

          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
