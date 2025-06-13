import { ScrollView, View } from 'react-native';
import styles from './editor.style';
import Header from './components/Header/header.component';
import Canvas from './components/Canvas/canvas.component';

const EditorScreen = () => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.canvasWrapper}>
        <Canvas/>
      </View>
    </ScrollView>
  );
};

export default EditorScreen;
