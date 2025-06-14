import React from 'react';
import { View } from 'react-native';
import styles from './canvas.style';
import {CanvasProps} from './canvas.type';

const Canvas = React.forwardRef<View, CanvasProps>(({style, children}, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.canvas, style]}>
      {children}
    </View>
  );
});

export default Canvas;
