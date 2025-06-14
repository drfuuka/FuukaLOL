import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import styles from './canvas-text.style';
import {TTextItemProps} from './canvas-text.type';

const CanvasText = ({
  textData,
  onUpdate,
  isActive,
  onSelect,
  onTouchStart,
  setIsTouchingText,
}: TTextItemProps) => {
  const translateX = useSharedValue(textData.x);
  const translateY = useSharedValue(textData.y);
  const scale = useSharedValue(textData.scale ?? 1);
  const offsetScale = useSharedValue(textData.scale ?? 1);

  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(textData.text);

  useEffect(() => {
    setIsEditing(false);
    setDraftText(textData.text);
  }, [textData.text]);

  useEffect(() => {
    if (!isActive) Keyboard.dismiss();
  }, [isActive]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      if (onTouchStart) runOnJS(onTouchStart)();
      if (setIsTouchingText) runOnJS(setIsTouchingText)(true);
    })
    .onChange(e => {
      translateX.value = e.translationX + textData.x;
      translateY.value = e.translationY + textData.y;
    })
    .onEnd(() => {
      if (setIsTouchingText) runOnJS(setIsTouchingText)(false);
      runOnJS(onUpdate)(textData.id, {
        x: translateX.value,
        y: translateY.value,
      });
    });

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = e.scale * (textData.scale ?? 1);
    })
    .onEnd(() => {
      runOnJS(onUpdate)(textData.id, {
        scale: scale.value,
      });
    });

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onSelect)(textData.id);
    if (onTouchStart) runOnJS(onTouchStart)();
  });

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onEnd(() => {
      runOnJS(setIsEditing)(true);
    });

  const resizeGesture = Gesture.Pan()
    .onBegin(() => {
      offsetScale.value = scale.value;
    })
    .onUpdate(e => {
      const delta = Math.max(e.translationX, e.translationY);
      scale.value = Math.max(0.3, Math.min(offsetScale.value + delta / 100, 5));
    })
    .onEnd(() => {
      runOnJS(onUpdate)(textData.id, {
        scale: scale.value,
      });
    });

  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(pan, tap),
    pinch,
    longPress,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  const handleSubmitEdit = () => {
    setIsEditing(false);
    onUpdate(textData.id, {text: draftText});
  };

  return (
    <GestureDetector gesture={isEditing ? Gesture.Tap() : composed}>
      <Animated.View style={[styles.textWrapper, animatedStyle]}>
        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              {
                backgroundColor: 'transparent',
                padding: 4,
                paddingVertical: 0,
              },
            ]}
            value={draftText}
            autoFocus
            onChangeText={setDraftText}
            onBlur={handleSubmitEdit}
            onSubmitEditing={handleSubmitEdit}
          />
        ) : (
          <View
            style={{
              borderWidth: isActive ? 0.4 : 0,
              borderColor: 'dodgerblue',
              padding: 4,
              paddingVertical: 0,
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: textData.bold ? 'bold' : 'normal',
                  fontStyle: textData.italic ? 'italic' : 'normal',
                  textAlign: textData.align,
                },
              ]}>
              {textData.text}
            </Text>

            {isActive && (
              <GestureDetector gesture={resizeGesture}>
                <View
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    backgroundColor: 'dodgerblue',
                    bottom: -8,
                    right: -8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'white',
                    zIndex: 10,
                  }}
                />
              </GestureDetector>
            )}
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasText;
