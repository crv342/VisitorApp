import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import CheckInScreen from '../screens/CheckInScreen';
import IdScanner from '../screens/IdScanner';
import AuthScreen from '../screens/AuthScreen';
import {Screen} from 'react-native-screens';
import {floor} from 'react-native-reanimated';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

// const CheckInNavigator = () => {
//     return (
//
//     )
// }

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            title: 'splash',
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{
            title: 'check',
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="IdScanner" component={IdScanner} />
        <Stack.Screen name="AuthNav" component={AuthNavigator} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
