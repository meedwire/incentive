import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { TasksConfig } from "../screens/TasksConfig";

export type IRouteParams = {
  Home: undefined;
  TasksConfig?: { id?: string };
};

const Stack = createStackNavigator<IRouteParams>();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Geral" }} />
      <Stack.Screen
        name="TasksConfig"
        component={TasksConfig}
        options={{ title: "Adicionar tarefa" }}
      />
    </Stack.Navigator>
  );
};

export { AppRoutes };
