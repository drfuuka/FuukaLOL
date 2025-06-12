import React from 'react';
import { View, Button } from 'react-native';
import styles from './style';

/**
 * MemeTemplateSelector component.
 * For now this is a dummy button, later will be used to select template.
 */
const MemeTemplateSelector = () => {
  return (
    <View style={styles.container}>
      <Button title="Select Template" onPress={() => {}} />
    </View>
  );
};

export default MemeTemplateSelector;
