import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login';
import {TasksConfig} from '../screens/TasksConfig';
import {Home} from '../screens/Home';

export type IRouteParams = {
  Home: undefined;
  TasksConfig?: {id?: string};
  Login: undefined;
};

const Stack = createStackNavigator<IRouteParams>();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} options={{title: 'Geral'}} />
      <Stack.Screen
        name="TasksConfig"
        component={TasksConfig}
        options={{title: 'Adicionar tarefa'}}
      />
    </Stack.Navigator>
  );
};

export {AppRoutes};
