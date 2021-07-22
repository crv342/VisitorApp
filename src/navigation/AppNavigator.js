import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Divider} from 'react-native-paper';
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
import HostList from '../screens/HostList';
import SettingScreen from '../screens/SettingScreen';
import CheckInDetails from '../screens/CheckInDetails';
import {logout} from '../store/actions/auth';
import CheckInSuccess from '../screens/CheckInSuccess';
import UpdatePassword from '../screens/UpdatePassword';

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
          headerShown:false,
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
      <Stack.Screen
        name={'Update Pass'}
        component={UpdatePassword}
        options={{headerShown: false}}
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
          title: 'checkIn',
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
      <Stack.Screen
        name={'CheckInSuccess'}
        component={CheckInSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// const VisitorLogNavigator = ({navigation}) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name={'VisitorLog'}
//         component={VisitorLogScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };
let luma;
const DrawerNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const userName = useSelector(state => state.auth.adminData.username);
  const Colors = useSelector(state => state.theme.colors);

  // useEffect(() => {
  //   let c = Colors.primary.slice().substring(1); // strip #
  //   let rgb = parseInt(c, 16); // convert rrggbb to decimal
  //   let r = (rgb >> 16) & 0xff; // extract red
  //   let g = (rgb >> 8) & 0xff; // extract green
  //   let b = (rgb >> 0) & 0xff; // extract blue
  //
  //   luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // }, [Colors]);

  useEffect(() => {
    setUsername(userName);
  }, [navigation, userName]);

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
                  labelStyle={{color: Colors.text}}
                  label={username || ''}
                  onPress={() => {
                    navigation.navigate('Settings');
                  }}
                  icon={() => (
                    <Icon
                      color={Colors.text}
                      size={24}
                      name={'account-circle'}
                    />
                  )}
                />
              </View>
              <Divider />
              <DrawerItemList {...props} />
              <Divider />
              <Button
                title="Logout"
                // color={'black'}
                onPress={() => {
                  dispatch(logout());
                  navigation.popToTop();
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
          // unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name={'Host'}
        component={HostList}
        options={{
          title: 'Hosts',
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
  const token = useSelector(state => state.auth.token);
  const isLoading = useSelector(state => state.auth.isLoading);

  if (isLoading) {
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
