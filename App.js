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
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C1403D',
    accent: '#f1c40f',
    backgroundColor: '#ffffff',
    background: '#fff'
  },
};

const App: () => Node = () => {
  return (
    <PaperProvider theme={theme}>
      {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
