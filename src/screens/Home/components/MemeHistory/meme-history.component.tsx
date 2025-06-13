import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './meme-history.style';
import { TMemeHistoryProps } from './meme-history.type';

const Item = ({ title, imageUrl }: TMemeHistoryProps) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Title = () => {
  return <Text style={styles.historyTitle}>Previously Cooked Memes</Text>;
};

const MemeHistory = {
  Title,
  Item,
};

export default MemeHistory;
