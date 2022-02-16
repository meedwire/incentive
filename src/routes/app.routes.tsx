import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { TasksConfig } from "../screens/TasksConfig";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
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
