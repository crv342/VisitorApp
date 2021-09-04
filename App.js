import 'react-native-gesture-handler';
import React from 'react';
import Node from 'react';
import {Provider as StoreProvider} from 'react-redux';
import ThemeProvider from './src/ThemeProvider';
import './src/i18n';

import store from './src/store/store';

const App: () => Node = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider />
    </StoreProvider>
  );
};

export default App;
