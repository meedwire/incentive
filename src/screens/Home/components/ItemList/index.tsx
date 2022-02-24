import React, { useEffect, useRef, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Layout,
  ZoomInLeft,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
  ZoomOut,
  withTiming,
} from "react-native-reanimated";
import { snapPoint, clamp } from "react-native-redash";
import { makeStyles } from "./styles";
import LottieView from "lottie-react-native";
import { Card, IconButton, Star } from "../../../../components";
import { IPropsItemList } from "./types";
import { MenuCard } from "./components";

const ItemList: React.FC<IPropsItemList> = React.memo(({ index, item }) => {
  const transitionX = useSharedValue(0);
  const refAnimation = useRef<LottieView>(null);
  const [enableAnimation, setEnableAnimation] = useState(false);

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
      // if (typeof handleDelete === "function") {
      //   runOnJS(handleDelete)();
      // }
    });
  }

  function onEdit() {
    transitionX.value = withTiming(0, { duration: 300 }, () => {
      // if (typeof handleEdit === "function") {
      //   runOnJS(handleEdit)();
      // }
    });
  }

  useEffect(() => {
    if (enableAnimation) {
      setTimeout(() => {
        refAnimation.current && refAnimation.current.play();
      }, 3000);
    }
  }, [enableAnimation]);

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
