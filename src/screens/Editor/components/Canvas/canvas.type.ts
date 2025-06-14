import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type CanvasProps = {
  style?: ViewStyle;
  children?: ReactNode;
  imageUri?: string;
};
