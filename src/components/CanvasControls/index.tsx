import React from 'react';
import { View, Button } from 'react-native';
import styles from './style';

/**
 * CanvasControls component.
 * Dummy buttons to add text or image to the canvas.
 */
const CanvasControls = () => {
  return (
    <View style={styles.container}>
      <Button title="Add Text" onPress={() => {}} />
      <Button title="Add Image" onPress={() => {}} />
    </View>
  );
};

export default CanvasControls;
