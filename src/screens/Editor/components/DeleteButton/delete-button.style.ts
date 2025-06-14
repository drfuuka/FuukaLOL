import colors from '@/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{translateX: -30}],
    zIndex: 10,
  },
  deleteButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 99,
    width: 60,
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
