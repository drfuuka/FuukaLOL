import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  clamp,
  runOnJS,
} from 'react-native-reanimated';
import {TCanvasImageProps} from './canvas-image.type';
import styles from './canvas-image.style';

const CanvasImage = ({uri, canvasSize, isActive, onSelect}: TCanvasImageProps) => {
  const scale = useSharedValue(1);
  const offsetScale = useSharedValue(1);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const BOUNDARY_MARGIN = 20;

  useEffect(() => {
    if (uri) {
      translationX.value = 0;
      translationY.value = 0;
      scale.value = 1;

      Image.getSize(
        uri,
        (width, height) => {
          setImageAspectRatio(width / height);
        },
        error => {
          console.error('Failed to get image size', error);
        },
      );
    }
  }, [uri, translationX, translationY, scale]);

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onSelect)();
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      offsetX.value = translationX.value;
      offsetY.value = translationY.value;
    })
    .onUpdate(event => {
      const baseW = imageAspectRatio > 1 ? canvasSize : canvasSize * imageAspectRatio;
      const baseH = imageAspectRatio > 1 ? canvasSize / imageAspectRatio : canvasSize;
      const imgW = baseW * scale.value;
      const imgH = baseH * scale.value;

      const maxX = imgW + (canvasSize - imgW) / 2 - BOUNDARY_MARGIN;
      const maxY = imgH + (canvasSize - imgH) / 2 - BOUNDARY_MARGIN;

      translationX.value = clamp(offsetX.value + event.translationX, -maxX, maxX);
      translationY.value = clamp(offsetY.value + event.translationY, -maxY, maxY);
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      offsetScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = offsetScale.value * event.scale;

      const baseW = imageAspectRatio > 1 ? canvasSize : canvasSize * imageAspectRatio;
      const baseH = imageAspectRatio > 1 ? canvasSize / imageAspectRatio : canvasSize;
      const imgW = baseW * scale.value;
      const imgH = baseH * scale.value;

      const maxX = imgW + (canvasSize - imgW) / 2 - BOUNDARY_MARGIN;
      const maxY = imgH + (canvasSize - imgH) / 2 - BOUNDARY_MARGIN;

      translationX.value = clamp(translationX.value, -maxX, maxX);
      translationY.value = clamp(translationY.value, -maxY, maxY);
    });

  const composedGesture = Gesture.Simultaneous(tapGesture, panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const w = imageAspectRatio > 1 ? canvasSize : canvasSize * imageAspectRatio;
    const h = imageAspectRatio > 1 ? canvasSize / imageAspectRatio : canvasSize;
    const offsetX = (canvasSize - w) / 2;
    const offsetY = (canvasSize - h) / 2;

    return {
      transform: [
        {translateX: translationX.value + offsetX},
        {translateY: translationY.value + offsetY},
        {scale: scale.value},
      ],
    };
  });

  const width = imageAspectRatio > 1 ? canvasSize : canvasSize * imageAspectRatio;
  const height = imageAspectRatio > 1 ? canvasSize / imageAspectRatio : canvasSize;

  return (
    <>
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          style={[
            animatedStyle,
            styles.animatedContainer,
            {
              width,
              height,
              borderWidth: isActive ? 1 : 0,
              borderColor: isActive ? 'dodgerblue' : 'transparent',
            },
          ]}>
          <Image source={{uri}} style={styles.image} resizeMode="contain" />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default CanvasImage;
