import { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCm1sErpcWA-NkW5hDM-P5h54-0qFy6ngE",
  authDomain: "incentive-cedce.firebaseapp.com",
  projectId: "incentive-cedce",
  storageBucket: "incentive-cedce.appspot.com",
  messagingSenderId: "225029922668",
  appId: "1:225029922668:web:ac56690155ef7f66d21d49",
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
