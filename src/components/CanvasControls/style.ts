import { StyleSheet } from 'react-native';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.md,
    backgroundColor: colors.buttonBackground,
  },
});

export default styles;
