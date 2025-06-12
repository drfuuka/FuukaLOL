import { ScrollView, View } from 'react-native';
import styles from './home.style';
import Header from './components/Header/header.component';
import CreateMemeButton from './components/CreateButton/create-button.component';
import MemeHistory from './components/MemeHistory/meme-history.component';

const mockHistory = [
  { id: '1', title: 'Cat Meme', imageUrl: 'https://i.imgur.com/abcd1.png' },
  { id: '2', title: 'Dog Meme', imageUrl: 'https://i.imgur.com/abcd2.png' },
  { id: '3', title: 'Drake Meme', imageUrl: 'https://i.imgur.com/abcd3.png' },
  { id: '4', title: 'Racing Meme', imageUrl: 'https://i.imgur.com/abcd4.png' },
];

const HomeScreen = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.buttonWrapper}>
        <CreateMemeButton />
      </View>

      <View style={styles.historyWrapper}>
        <MemeHistory.Title />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockHistory.map((item) => (
            <MemeHistory.Item
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
