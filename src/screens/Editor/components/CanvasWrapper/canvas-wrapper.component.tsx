import React from 'react';
import { View } from 'react-native';
import { TCanvasWrapperProps } from './canvas-wrapper.type';
import styles from './canvas-wrapper.style';

const CanvasWrapper = ({ children, style }: TCanvasWrapperProps) => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

export default CanvasWrapper;
