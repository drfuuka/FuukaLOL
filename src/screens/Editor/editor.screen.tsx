import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
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
import CanvasText from './components/CanvasText/canvas-text.component';
import uuid from 'react-native-uuid';
import {TTextItem} from './components/CanvasText/canvas-text.type';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {requestStoragePermission} from '@/utils/permission';

const CANVAS_SIZE = Dimensions.get('window').width * 0.9;

type ImageItem = {
  id: string;
  uri: string;
};

const EditorScreen = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [texts, setTexts] = useState<TTextItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreatingText, setIsCreatingText] = useState(false);
  const [pendingText, setPendingText] = useState('');

  const isTouchingTextRef = useRef(false);
  const viewShotRef = useRef(null);

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

  const handleAddText = () => {
    setIsCreatingText(true);
    setPendingText('');
  };

  const handleSubmitText = () => {
    if (!pendingText.trim()) return;
    const id = uuid.v4() as string;
    const newText: TTextItem = {
      id,
      text: pendingText,
      x: 100,
      y: 100,
      scale: 1,
      bold: false,
      italic: false,
      align: 'center',
    };
    setTexts(prev => [...prev, newText]);
    setPendingText('');
    setIsCreatingText(false);
  };

  const handleUpdateText = (id: string, newData: Partial<TTextItem>) => {
    setTexts(prev => prev.map(t => (t.id === id ? {...t, ...newData} : t)));
  };

  const handleDeleteText = (idToDelete: string) => {
    setTexts(prev => prev.filter(t => t.id !== idToDelete));
    if (selectedId === idToDelete) setSelectedId(null);
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;

    const isText = texts.some(t => t.id === selectedId);
    if (isText) {
      handleDeleteText(selectedId);
    } else {
      handleDeleteImage(selectedId);
    }
  };

  const handleExportCanvas = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Storage access is required to save the image.',
        );
        return;
      }

      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });

      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert(
        'Saved to Gallery',
        'Canvas has been saved to your photo gallery!',
      );
    } catch (error) {
      console.error('Export failed:', error);
      Alert.alert(
        'Export Failed',
        'Something went wrong while saving the image.',
      );
    }
  };

  const tapOutsideGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      isTouchingTextRef.current = false;
    })
    .onEnd(() => {
      setTimeout(() => {
        if (!isTouchingTextRef.current) {
          runOnJS(setSelectedId)(null);
        }
      }, 100);
    });

  return (
    <GestureDetector gesture={tapOutsideGesture}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.canvasWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <View style={styles.canvasWrapper}>
            <Header onExport={handleExportCanvas} />

            {isCreatingText && (
              <TextInput
                value={pendingText}
                onChangeText={setPendingText}
                placeholder="Enter your text..."
                autoFocus
                onSubmitEditing={handleSubmitText}
                onBlur={() => setIsCreatingText(false)}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  margin: 16,
                  backgroundColor: '#fff',
                }}
              />
            )}

            <View style={styles.canvasWrapper}>
              <CanvasWrapper>
                <ViewShot
                  ref={viewShotRef}
                  style={styles.viewShot}
                  options={{format: 'png', quality: 1}}>
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
                    {texts.map(text => (
                      <CanvasText
                        key={text.id}
                        textData={text}
                        onUpdate={handleUpdateText}
                        onDelete={handleDeleteText}
                        isActive={selectedId === text.id}
                        onSelect={() => setSelectedId(text.id)}
                        onTouchStart={() => {
                          isTouchingTextRef.current = true;
                        }}
                      />
                    ))}
                  </Canvas>
                </ViewShot>
                {selectedId && <DeleteButton onDelete={handleDeleteSelected} />}
              </CanvasWrapper>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* ToolBar tetap fixed di bawah, gak kegeser */}
        <View style={styles.toolBarWrapper}>
          <ToolBar
            onImportImage={handleImportImage}
            onAddText={handleAddText}
          />
        </View>
      </View>
    </GestureDetector>
  );
};

export default EditorScreen;
