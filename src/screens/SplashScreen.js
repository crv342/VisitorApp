import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import * as authActions from '../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetails} from '../store/actions/host';
import {updateChartColor, updateTheme} from '../store/actions/theme';
import i18next from 'i18next';

const SplashScreen = props => {
  const {t} = useTranslation();
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

      dispatch(updateChartColor(chartColorDataJson));
    };
    getChartColor();
  }, [dispatch]);

  useEffect(() => {
    const getLang = async () => {
      const langData = await AsyncStorage.getItem('language');
      const langDataJson = JSON.parse(langData);

      if (!langData) {
        return;
      }
      i18next.changeLanguage(langDataJson.lang);
    };
    getLang();
  }, []);

  return (
    <View style={{...styles.screen}}>
      <Image
        source={require('../Image/visitor.jpeg')}
        style={{
          width: '15%',
          resizeMode: 'contain',
          marginBottom: -40,
          marginRight: -18,
        }}
      />
      <View style={styles.logoContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode={'center'}
            style={{alignSelf: 'center'}}
            source={require('../Image/logo.png')}
          />
          <Text style={{fontSize: 16, marginTop: -48, zIndex: 100}}>
            VISITOR
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    width: '40%',
    alignItems: 'center',
  },
});

export default SplashScreen;
