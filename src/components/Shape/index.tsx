import React from "react";
import { Svg, Path, G } from "react-native-svg";

interface IPropsShape {
  mirror?: boolean;
}

const Shape: React.FC<IPropsShape> = ({ children, mirror }) => {
  return (
    <Svg
      style={{ alignSelf: "center" }}
      width={350}
      height={614}
      viewBox="0 0 123.52 214.41"
    >
      <G transform={mirror ? "rotate(180, 61.76, 107.205)" : undefined}>
        <Path
          fill="#ffffff"
          d="M10.33 0.41l102.86 0c5.46,0 9.92,4.47 9.92,9.92l0 191.13c0,6.74 -8.09,18.97 -23.52,8.4l-89.26 -61.17c-6.82,-4.68 -9.92,-6.85 -9.92,-15.55l0 -122.81c0,-5.46 4.46,-9.92 9.92,-9.92z"
        />
      </G>
      {children}
    </Svg>
  );
};

export { Shape };
