import colors from '@/theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.canvasBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
