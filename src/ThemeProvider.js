import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';
import {useSelector} from 'react-redux';

const ThemeProvider = () => {
  const Colors = useSelector(state => state.theme.colors);
  const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      accent: Colors.accent,
      backgroundColor: '#ffffff',
      background: '#fff',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default ThemeProvider;
