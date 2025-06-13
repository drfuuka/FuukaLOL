import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from './canvas.style';

const Canvas = () => {
  const [backgroundUri] = useState<string>('https://i.imgflip.com/1bij.jpg');

  // Shared values for gesture
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const panContext = useSharedValue({x: 0, y: 0});
  const pinchContext = useSharedValue(1);

  const panGesture = Gesture.Pan()
  .onBegin(() => {
    panContext.value = {
      x: translationX.value,
      y: translationY.value,
    };
  })
  .onUpdate(event => {
    translationX.value = panContext.value.x + event.translationX;
    translationY.value = panContext.value.y + event.translationY;
  });

  const pinchGesture = Gesture.Pinch()
  .onBegin(() => {
    pinchContext.value = scale.value;
  })
  .onUpdate(event => {
    scale.value = pinchContext.value * event.scale;
  });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <View style={styles.canvas}>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={{uri: backgroundUri}}
          style={[styles.backgroundImage, animatedStyle]}
          resizeMode="contain"
        />
      </GestureDetector>
    </View>
  );
};

export default Canvas;
