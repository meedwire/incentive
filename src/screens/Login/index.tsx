import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {Input, Shape} from '../../components';
import {Canvas, Fill, Path} from '@shopify/react-native-skia';

const Login: React.FC = () => {
  return (
    <Canvas style={styles.container}>
      <Fill color="white" />
      <Path path="M10.33 0.41l102.86 0c5.46,0 9.92,4.47 9.92,9.92l0 191.13c0,6.74 -8.09,18.97 -23.52,8.4l-89.26 -61.17c-6.82,-4.68 -9.92,-6.85 -9.92,-15.55l0 -122.81c0,-5.46 4.46,-9.92 9.92,-9.92z" />
    </Canvas>
  );
};

export {Login};
