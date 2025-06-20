import colors from '@/theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    marginVertical: 24,
    alignItems: 'center',
    marginTop: 'auto',
  },
  historyWrapper: {
    marginTop: 'auto',
    marginBottom: 32,
  },
});

export default styles;
