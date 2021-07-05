import React from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../constants/Colors';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import SplashScreen from '../screens/SplashScreen';
import CheckInScreen from '../screens/CheckInScreen';
import IdScanner from '../screens/IdScanner';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import VisitorLogScreen from '../screens/VisitorLogScreen';
import EmployeeList from '../screens/EmployeeList';
import SettingScreen from '../screens/SettingScreen';
import CheckInDetails from '../screens/CheckInDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: 'Admin Login',
          // headerShown: false,
          headerLeft: () => (
            <Icon
              name={Platform.OS === 'ios' ? 'arrow-back-ios' : 'arrow-back'}
              color={'black'}
              size={24}
              style={{marginLeft: 12}}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'DashBoard'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const CheckInNavigator = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name={'CheckOut'} component={CheckOutScreen} />
      <Stack.Screen
        name={'IdScanner'}
        component={IdScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'CheckInDetails'} component={CheckInDetails} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
        return (
          <View>
            <View
              style={{
                // flex: 1,
                height: 50,
                backgroundColor: Colors.primary,
              }}
            />
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <View style={{backgroundColor: Colors.primary}}>
                <DrawerItem
                  label={'Admin'}
                  onPress={() => {
                    navigation.navigate('Settings');
                  }}
                  o
                  icon={() => (
                    <Icon color={'white'} size={24} name={'account-circle'} />
                  )}
                />
              </View>

              <DrawerItemList {...props} />
              <Button
                title="Logout"
                // color={'black'}
                onPress={() => {
                  // dispatch(authActions.logout());
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'CheckInNav'}],
                  });
                }}>
                Logout <Icon name={'logout'} />
              </Button>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}>
      <Drawer.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          title: 'DashBoard',
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon
              name={'dashboard'}
              size={size}
              color={focused ? Colors.primary : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Visitor Log'}
        component={VisitorLogScreen}
        options={{
          title: 'History',
          drawerIcon: ({focused, size}) => (
            <Icon
              name={'history'}
              size={size}
              color={focused ? Colors.primary : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Employee'}
        component={EmployeeList}
        options={{
          title: 'Employees',
          drawerIcon: ({focused, size}) => (
            <Icon
              name={'people'}
              size={size}
              color={focused ? Colors.primary : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Settings'}
        component={SettingScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Icon
              name={'settings'}
              size={size}
              color={focused ? Colors.primary : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

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
          name={'CheckInNav'}
          component={CheckInNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthNav"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'DrawerNav'}
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
