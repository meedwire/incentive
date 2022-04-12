import React, {useCallback} from 'react';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import Animated, {Layout} from 'react-native-reanimated';
import {useAllTasks} from '../../hooks';
import {ButtonPlus} from './components';
import {ItemList} from './components/ItemList';
import {ActivityIndicator} from 'react-native';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, tasks] = useAllTasks(true);

  function handleAddTask() {
    navigation.navigate('TasksConfig');
  }

  const renderItems = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size={60} color="#97ff8ba1" />;
    }

    return tasks?.map((item, index) => (
      <ItemList key={item.id} item={item} index={index} />
    ));
  }, [isLoading, tasks]);

  return (
    <Animated.View layout={Layout} style={styles.container}>
      <StatusBar backgroundColor="white" />
      <GestureHandlerRootView style={styles.container}>
        <Animated.ScrollView
          layout={Layout}
          contentContainerStyle={styles.scroll}>
          <Animated.View layout={Layout}>{renderItems()}</Animated.View>
        </Animated.ScrollView>
        <ButtonPlus onPress={handleAddTask} />
      </GestureHandlerRootView>
    </Animated.View>
  );
};

export {Home};
