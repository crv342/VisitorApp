import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';
import {useSelector} from 'react-redux';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Platform} from 'react-native';

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

  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'id1',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default ThemeProvider;
