import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import styles from './style';

/**
 * MemeCanvas component with pan and pinch gestures.
 */
const MemeCanvas = () => {
  const [backgroundUri] = useState<string>('https://i.imgflip.com/1bij.jpg');

  // Shared values for gesture
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  // Pinch gesture
  const pinchGesture = Gesture.Pinch().onUpdate(event => {
    scale.value = event.scale;
  });

  // Pan gesture
  const panGesture = Gesture.Pan().onUpdate(event => {
    translationX.value = event.translationX;
    translationY.value = event.translationY;
  });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  // Animated style
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

export default MemeCanvas;
