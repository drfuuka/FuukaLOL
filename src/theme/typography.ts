import {Platform} from 'react-native';

export const Fonts = {
  BebasNeue: Platform.select({
    ios: 'BebasNeue',
    android: 'BebasNeue-Regular',
  }),
};

export default Fonts;

