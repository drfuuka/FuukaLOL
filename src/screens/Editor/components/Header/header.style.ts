import colors from '@/theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    borderRadius: 99,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 99,
    padding: 25,
    overflow: 'hidden',
  },
});

export default styles;
