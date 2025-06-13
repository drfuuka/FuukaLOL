import colors from '@/theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    marginVertical: 24,
    alignItems: 'center',
    marginTop: 'auto',
  },
  canvasWrapper: {
    flex: 1,
  },
  toolBarWrapper: {
    position: 'static',
    bottom: 0,
  },
});

export default styles;
