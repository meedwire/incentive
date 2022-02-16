import "./src/services/firebase";
import { Routes } from "./src/routes/routes";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" />
      <Routes />
    </>
  );
}
