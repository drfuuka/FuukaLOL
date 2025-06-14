import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View as RNView,
  Keyboard,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from './canvas.style';
import TextContent from '../TextContent/text-content.component';

const Canvas = ({
  backgroundUri,
  setBackgroundUri,
}: {
  backgroundUri: string;
  setBackgroundUri: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  // State & Refs
  const [isDragging, setIsDragging] = useState(false);
  const [isTrashActive, setTrashActive] = useState(false);
  const [trashCenter, setTrashCenter] = useState({
    x: screenWidth / 2,
    y: screenHeight - 100,
  });
  const [texts, setTexts] = useState<
    {id: string; text: string; x: number; y: number}[]
  >([]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [currentDraggingTextId, setCurrentDraggingTextId] = useState<string | null>(null);

  const trashIconRef = useRef<RNView>(null);

  // Gesture shared values
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const pinchContext = useSharedValue(1);
  const trashScale = useSharedValue(1);

  // UX constants
  const TRASH_AREA_RADIUS = 80;
  const TRASH_Y_OFFSET_THRESHOLD = 5;

  // Keyboard listener → auto Done edit
  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setEditingTextId(null);
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  // Utils
  const calculateInRange = (absoluteX: number, absoluteY: number) => {
    'worklet';
    const distX = absoluteX - trashCenter.x;
    const distY = absoluteY - trashCenter.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return distY > TRASH_Y_OFFSET_THRESHOLD && distance < TRASH_AREA_RADIUS;
  };

  const handleAddText = (newId: string) => {
    setTexts(prev => [
      ...prev,
      {
        id: newId,
        text: '',
        x: screenWidth / 2,
        y: screenHeight / 2,
      },
    ]);
    setEditingTextId(newId);
  };

  // Gestures
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (!isDragging && backgroundUri && editingTextId === null) {
      const newId = String(Date.now());
      runOnJS(handleAddText)(newId);
    }
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      translationX.value = translationX.value;
      translationY.value = translationY.value;
    })
    .onUpdate(event => {
      if (!isDragging) {
        runOnJS(setIsDragging)(true);
      }
      translationX.value = event.translationX;
      translationY.value = event.translationY;

      const inRange = calculateInRange(event.absoluteX, event.absoluteY);
      runOnJS(setTrashActive)(inRange);
      trashScale.value = withTiming(inRange ? 1.3 : 1, {duration: 150});
    })
    .onEnd(event => {
      runOnJS(setIsDragging)(false);

      const inRange = calculateInRange(event.absoluteX, event.absoluteY);

      if (inRange) {
        runOnJS(setBackgroundUri)('');
        translationX.value = withTiming(0, {duration: 150});
        translationY.value = withTiming(0, {duration: 150});
        scale.value = withTiming(1, {duration: 150});
      }

      runOnJS(setTrashActive)(false);
      trashScale.value = withTiming(1, {duration: 150});
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      pinchContext.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = pinchContext.value * event.scale;
    });

  const combinedGesture = Gesture.Simultaneous(
    tapGesture,
    panGesture,
    pinchGesture,
  );

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
      {scale: scale.value},
    ],
  }));

  const trashAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: trashScale.value}],
    backgroundColor: isTrashActive ? 'red' : 'rgba(0,0,0,0.6)',
  }));

  return (
    <GestureDetector gesture={combinedGesture}>
      <RNView style={styles.canvas}>
        {backgroundUri && (
          <Animated.Image
            source={{uri: backgroundUri}}
            style={[styles.backgroundImage, animatedStyle]}
            resizeMode="contain"
          />
        )}

        {texts.map(t => (
          <TextContent
            key={t.id}
            textData={t}
            isEditing={editingTextId === t.id}
            onDrag={(id, isTextDragging) => {
              setCurrentDraggingTextId(isTextDragging ? id : null);
            }}
            onEdit={(id, newX, newY) => {
              setTexts(prev =>
                prev.map(txt =>
                  txt.id === id ? {...txt, x: newX, y: newY} : txt,
                ),
              );
            }}
            onPressText={() => setEditingTextId(t.id)}
            onFinishEdit={() => setEditingTextId(null)}
          />
        ))}

        {isDragging && (
          <RNView
            ref={trashIconRef}
            style={styles.trashIconWrapper}
            onLayout={() => {
              trashIconRef.current?.measureInWindow((x, y, width, height) => {
                const trashX = x + width / 2;
                const trashY = y + height / 2;
                runOnJS(setTrashCenter)({x: trashX, y: trashY});
              });
            }}>
            <Animated.View style={[styles.trashIcon, trashAnimatedStyle]}>
              <Text>🗑️</Text>
            </Animated.View>
          </RNView>
        )}
      </RNView>
    </GestureDetector>
  );
};

export default Canvas;
