import React from 'react';
import { View, Button } from 'react-native';
import styles from './style';

/**
 * ExportButton component.
 * Will be used to export the canvas as an image.
 */
const ExportButton = () => {
  return (
    <View style={styles.container}>
      <Button title="Export Meme" onPress={() => {}} />
    </View>
  );
};

export default ExportButton;
