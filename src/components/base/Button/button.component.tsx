import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeOpacity?: number;
};

const Button = ({
  children,
  onPress,
  style,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.12)',
        borderless: false,
        radius: 99,
      }}
      style={style}
    >
      {children}
    </Pressable>
  );
};

export default Button;
