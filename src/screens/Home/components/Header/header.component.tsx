import React from 'react';
import { View, Text } from 'react-native';
import styles from './header.style';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FUUKALOL</Text>
      <Text style={styles.subTitle}>Unleash Your Meme Magic with my beloved meme project!</Text>
    </View>
  );
};

export default Header;
