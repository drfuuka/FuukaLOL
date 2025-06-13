import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './editor.style';
import Header from './components/Header/header.component';
import Canvas from './components/Canvas/canvas.component';
import ToolBar from './components/ToolBar/tool-bar.component';
import { launchImageLibrary } from 'react-native-image-picker';

const EditorScreen = () => {
  const [backgroundUri, setBackgroundUri] = useState('');

  const handleImportImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      setBackgroundUri(result.assets[0].uri || '');
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.canvasWrapper}>
        <Canvas backgroundUri={backgroundUri} />
      </View>

      <View style={styles.toolBarWrapper}>
        <ToolBar onImportImage={handleImportImage} />
      </View>
    </ScrollView>
  );
};

export default EditorScreen;
