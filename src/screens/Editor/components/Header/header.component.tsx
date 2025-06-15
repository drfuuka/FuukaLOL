import React from 'react';
import { View } from 'react-native';
import Button from '@/components/base/Button/button.component';
import { ArrowLeft, Export } from '@/assets/icons';
import styles from './header.style';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/navigation.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { THeaderProps } from './header.type';

const Header = ({onExport} : THeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} onPress={handleBack}>
          <ArrowLeft/>
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} onPress={onExport}>
          <Export/>
        </Button>
      </View>
    </View>
  );
};

export default Header;