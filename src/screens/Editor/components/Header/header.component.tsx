import React from 'react';
import { View } from 'react-native';
import Button from '@/components/base/Button/button.component';
import { ArrowLeft, Export } from '@/assets/icons';
import styles from './header.style';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/navigation.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Header = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button style={styles.leftButton} onPress={handleBack}>
          <ArrowLeft/>
        </Button>
      </View>
      <Button>
        <Export/>
      </Button>
    </View>
  );
};

export default Header;