import React from 'react';
import {TextInput} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const TextContent = ({
  textData,
  isEditing,
  onDrag,
  onEdit,
  onPressText,
  onFinishEdit,
}: {
  textData: {id: string; text: string; x: number; y: number};
  isEditing: boolean;
  onDrag: (id: string, isDragging: boolean) => void;
  onEdit: (id: string, newX: number, newY: number) => void;
  onPressText: () => void;
  onFinishEdit: () => void;
}) => {
  const panX = useSharedValue(textData.x);
  const panY = useSharedValue(textData.y);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(onDrag)(textData.id, true);
    })
    .onUpdate(event => {
      panX.value = textData.x + event.translationX;
      panY.value = textData.y + event.translationY;
    })
    .onEnd(() => {
      runOnJS(onDrag)(textData.id, false);
      runOnJS(onEdit)(textData.id, panX.value, panY.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    left: panX.value,
    top: panY.value,
  }));

  if (isEditing) {
    return (
      <TextInput
        style={[
          {
            position: 'absolute',
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            minWidth: 100,
          },
          animatedStyle,
        ]}
        value={textData.text}
        onChangeText={() => {
          onEdit(textData.id, panX.value, panY.value);
          // Optional: update text content
        }}
        autoFocus
        onSubmitEditing={() => onFinishEdit()}
        blurOnSubmit
      />
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.Text
        style={[
          {
            position: 'absolute',
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            opacity: 1,
          },
          animatedStyle,
        ]}
        onPress={onPressText}
      >
        {textData.text}
      </Animated.Text>
    </GestureDetector>
  );
};

export default TextContent;
