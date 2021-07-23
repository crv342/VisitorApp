import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text as text} from 'react-native';
import {Text} from 'react-native-paper';
import * as authActions from '../store/actions/auth';
import * as visitorActions from '../store/actions/visitor';

// import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetails} from '../store/actions/host';
import {updateChartColor, updateTheme} from '../store/actions/theme';

const SplashScreen = props => {
  const dispatch = useDispatch();
  const Colors = useSelector(state => state.theme.colors);

  useEffect(() => {
    const tryLogin = async () => {
      const storedUserData = await AsyncStorage.getItem('adminData');
      const userDataJson = JSON.parse(storedUserData);

      if (!storedUserData) {
        dispatch(authActions.restoreToken(null, null));
        return;
      }

      const {token, adminData, expiryDate} = userDataJson;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !adminData) {
        dispatch(authActions.restoreToken(null, null));
        return;
      }

      dispatch(authActions.restoreToken(token, adminData));
    };
    tryLogin();
    dispatch(fetchDetails());
  }, [dispatch]);

  useEffect(() => {
    const getTheme = async () => {
      const themeData = await AsyncStorage.getItem('theme');
      const themeDataJson = JSON.parse(themeData);

      if (!themeData) {
        return;
      }

      const {primary, accent} = themeDataJson;

      dispatch(updateTheme(primary, accent));
    };
    getTheme();
  }, [Colors, dispatch]);

  useEffect(() => {
    const getChartColor = async () => {
      const chartColorData = await AsyncStorage.getItem('chartColors');
      const chartColorDataJson = JSON.parse(chartColorData);

      if (!chartColorData) {
        return;
      }

      // const {primary, accent} = chartColorDataJson;

      dispatch(updateChartColor(chartColorDataJson));
    };
    getChartColor();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(visitorActions.fetchCheckedIn()).catch(e => console.log(e));
  // },[dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     props.navigation.replace('CheckInNav');
  //   }, 1000);
  // }, []);

  return (
    <View style={{...styles.screen}}>
      <Image
        source={require('../Image/visitor.jpeg')}
        style={{width: '10%', resizeMode: 'contain', margin: 30}}
      />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 16}}>La Net</Text>
        <Text style={{fontSize: 12}}>Visitor</Text>
      </View>
      {/*<ActivityIndicator*/}
      {/*  animating={animating}*/}
      {/*  color="#FFFFFF"*/}
      {/*  size="large"*/}
      {/*  style={styles.activityIndicator}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.primary,
    flexDirection: 'row',
  },
});

export default SplashScreen;
