import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './style';
import Logo from '../../components/Logo';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Logo/>
      <Button title="Go to Gallery" onPress={() => navigation.navigate('Gallery')} />
    </View>
  );
};

export default HomeScreen;
