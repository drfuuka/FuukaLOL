import colors from '@/theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
});

export default styles;
