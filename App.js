import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import ThemeProvider from './src/ThemeProvider';

import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C1403D',
    accent: '#f1c40f',
    backgroundColor: '#ffffff',
    background: '#fff',
  },
};

const App: () => Node = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider />
      {/*<PaperProvider theme={theme}>*/}
      {/*  /!*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*!/*/}
      {/*  <AppNavigator />*/}
      {/*</PaperProvider>*/}
    </StoreProvider>
  );
};

export default App;
