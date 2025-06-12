import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './style';
import MemeTemplateSelector from '../../components/MemeTemplateSelector';
import MemeCanvas from '../../components/MemeCanvas';
import CanvasControls from '../../components/CanvasControls';
import ExportButton from '../../components/ExportButton';

const EditorScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <MemeTemplateSelector />
      <MemeCanvas />
      <CanvasControls />
      <ExportButton />
      <Button title="Go to Gallery" onPress={() => navigation.navigate('Gallery')} />
    </View>
  );
};

export default EditorScreen;