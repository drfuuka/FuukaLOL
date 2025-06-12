import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import colors from './src/theme/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation';


/**
 * App root component.
 * Compose the Meme Generator UI.
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <Navigation/>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
