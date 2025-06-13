import React from 'react';
import { Image, StyleProp, ViewStyle } from 'react-native';
import Button from '../Button/button.component';

type IconButtonProps = {
  icon: any;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const IconButton = ({
  icon,
  onPress,
  size = 24,
  style,
  disabled = false,
}: IconButtonProps) => {
  return (
    <Button onPress={onPress} style={style} disabled={disabled}>
      <Image
        source={icon}
        style={{
          width: size,
          height: size,
        }}
      />
    </Button>
  );
};

export default IconButton;
