import React from 'react';
import { View, Text } from 'react-native';
import styles from './header.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top || 16}]}>
      <Text style={styles.title}>FUUKALOL</Text>
      <Text style={styles.subTitle}>Unleash Your Meme Magic with my beloved meme project!</Text>
    </View>
  );
};

export default Header;
