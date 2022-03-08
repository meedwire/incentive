import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, FlatList, View } from "react-native";
import Animated, { BounceIn, Layout } from "react-native-reanimated";
import { AnimatedTouchable } from "../../../../components/AnimatedTouchable";
import { shade } from "polished";
import { colors as dataColors } from "../../../../constants";

import { makeStyles } from "./styles";
import { IPropsColorScheme } from "./types";

const colors = [...new Set(dataColors)].filter((_, i) => i % 6 === 0);

const ColorScheme: React.FC<IPropsColorScheme> = ({
  onChangeColor,
  defaultColor,
}) => {
  const refScroll = useRef<FlatList>(null);

  const styles = useMemo(() => makeStyles(defaultColor), [defaultColor]);

  useEffect(() => {
    onChangeColor(defaultColor || "#dadada");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (refScroll.current) {
        refScroll.current.scrollToIndex({
          index: colors.findIndex((item) => item === defaultColor),
          viewOffset: Dimensions.get("screen").width / 2 - 22,
        });
      }
    }, 500);
  }, [defaultColor]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <AnimatedTouchable
        layout={Layout}
        entering={BounceIn}
        onPress={() => {
          onChangeColor(item);
        }}
        style={[
          styles.bulletColor,
          {
            backgroundColor: item,
            borderColor: shade(0.2, item),
            transform: [{ scale: defaultColor === item ? 1 : 0.9 }],
            elevation: defaultColor === item ? 4 : 2,
            borderWidth: defaultColor === item ? 3 : 0.5,
          },
        ]}
      />
    ),
    [defaultColor]
  );

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.textLabel}>Cor do card: </Animated.Text>
      <FlatList
        ref={refScroll}
        data={colors}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        initialNumToRender={colors.length}
        renderItem={renderItem}
      />
    </View>
  );
};

export { ColorScheme };
