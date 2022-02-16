import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      TasksConfig: undefined;
    }
  }
}

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export { Routes };
