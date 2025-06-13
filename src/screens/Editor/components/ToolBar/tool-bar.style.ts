import colors from '@/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingBottom: 25,
    paddingTop: 18,
    justifyContent: 'center',
  },
  itemWrapper: {
      marginHorizontal: 8,
      borderRadius: 12,
      overflow: 'hidden',
  },
  item: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 8,
      borderRadius: 99,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default styles;
