import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Layout,
  ZoomInLeft,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  runOnJS,
  ZoomOut,
  withTiming,
} from "react-native-reanimated";
import { snapPoint, clamp } from "react-native-redash";
import { Card } from "../../../../components";
import { IPropsItemList } from "./types";
import { MenuCard } from "./components";
import { useNavigation } from "@react-navigation/native";
import { useTaskDelete } from "../../../../hooks";

const ItemList: React.FC<IPropsItemList> = React.memo(({ index, item }) => {
  const transitionX = useSharedValue(0);
  const navigation = useNavigation();
  const { taskDelete } = useTaskDelete(item.id);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event, context) => {
      transitionX.value = withSpring(
        snapPoint(
          clamp(event.translationX, -100, 0),
          event.velocityX,
          [-100, 0]
        ),
        {
          velocity: event.velocityX,
          damping: 15,
        }
      );
    },
  });

  function onDelete() {
    transitionX.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(taskDelete)();
    });
  }

  function handleEdit() {
    navigation.navigate("TasksConfig", { id: item.id });
  }

  function onEdit() {
    transitionX.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(handleEdit)();
    });
  }

  return (
    <PanGestureHandler
      activeOffsetX={[-10, 10]}
      onGestureEvent={onGestureEvent}
    >
      <Animated.View
        layout={Layout}
        exiting={ZoomOut}
        style={{ justifyContent: "center" }}
        entering={ZoomInLeft.delay(index * 100)}
      >
        <MenuCard
          translationX={transitionX}
          handleDelete={onDelete}
          handleUpdate={onEdit}
        />
        <Card item={item} translationX={transitionX} />
      </Animated.View>
    </PanGestureHandler>
  );
});

export { ItemList };
