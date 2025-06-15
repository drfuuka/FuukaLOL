import colors from '@/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: 40,
  },
  buttonWrapper: {
    marginVertical: 24,
    alignItems: 'center',
    marginTop: 'auto',
  },
  canvasWrapper: {
    flex: 1,
  },
  viewShot: {
    flex: 1,
  },
  toolBarWrapper: {
    position: 'static',
    bottom: 0,
  },
  hintWrapper: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hint: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  hintText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default styles;
