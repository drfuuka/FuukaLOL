import React from 'react';
import { Text, Pressable } from 'react-native';
import styles from './create-button.style';

const CreateMemeButton = () => {
  const handlePress = () => {
    console.log('Create Meme Pressed');
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Create Meme</Text>
    </Pressable>
  );
};

export default CreateMemeButton;
