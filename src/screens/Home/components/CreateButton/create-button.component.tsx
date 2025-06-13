import React from 'react';
import { Text, View } from 'react-native';
import styles from './create-button.style';
import Button from '@/components/base/Button/button.component';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';

const CreateMemeButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate('Editor');
  };

  return (
    <View style={styles.wrapper}>
      <Button style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Create Meme</Text>
      </Button>
    </View>
  );
};

export default CreateMemeButton;
