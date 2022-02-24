import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import App from "./src/App";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

registerRootComponent(App);
