import colors from '@/theme/colors';
import {StyleSheet} from 'react-native';

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
  trashIconWrapper: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{translateX: -40}],
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
