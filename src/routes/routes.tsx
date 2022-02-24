import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes, IRouteParams } from "./app.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IRouteParams {}
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
