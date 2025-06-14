import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import styles from './editor.style';
import Header from './components/Header/header.component';
import Canvas from './components/Canvas/canvas.component';
import ToolBar from './components/ToolBar/tool-bar.component';
import CanvasWrapper from './components/CanvasWrapper/canvas-wrapper.component';
import CanvasImage from './components/CanvasImage/canvas-image.component';
import DeleteButton from './components/DeleteButton/delete-button.component';

const CANVAS_SIZE = Dimensions.get('window').width * 0.9;

type ImageItem = {
  id: string;
  uri: string;
};

const EditorScreen = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleImportImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        uri: result.assets[0].uri || '',
      };
      setImages(prev => [...prev, newImage]);
    }
  };

  const handleDeleteImage = (idToDelete: string | null) => {
    setImages(prev => prev.filter(img => img.id !== idToDelete));
    if (selectedId === idToDelete) setSelectedId(null);
  };

  const tapOutsideGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      runOnJS(setSelectedId)(null);
    });

  return (
    <GestureDetector gesture={tapOutsideGesture}>
      <View style={styles.container}>
        <Header />

        <View style={styles.canvasWrapper}>
          <CanvasWrapper>
            <Canvas style={{width: CANVAS_SIZE, height: CANVAS_SIZE}}>
              {images.map(image => (
                <CanvasImage
                  key={image.id}
                  uri={image.uri}
                  canvasSize={CANVAS_SIZE}
                  isActive={selectedId === image.id}
                  onSelect={() => setSelectedId(image.id)}
                />
              ))}
            </Canvas>
            {selectedId && (<DeleteButton onDelete={() => handleDeleteImage(selectedId)}/>)}
          </CanvasWrapper>
        </View>

        <View style={styles.toolBarWrapper}>
          <ToolBar onImportImage={handleImportImage} />
        </View>
      </View>
    </GestureDetector>
  );
};

export default EditorScreen;
