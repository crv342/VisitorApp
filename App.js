/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

const App: () => Node = () => {
  return (
    <PaperProvider>
      {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
