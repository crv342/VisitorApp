import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Image} from 'react-native';
import {Text, Button, Divider, Title} from 'react-native-paper';

import Color from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as visitorActions from '../store/actions/visitor';

const CheckInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userName = useSelector(state => state);
  console.log(userName);
  useEffect(() => {
    dispatch(visitorActions.fetchCheckedIn()).catch(e => console.log(e));
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      {/* <StatusBar translucent={true} /> */}
      <View style={styles.logoContainer}>
        <Image
          resizeMode={'center'}
          // style={styles.logoStyle}
          source={require('../Image/logo.png')}
        />
        {/*<Title>VISITOR</Title>*/}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          // color={Colors.red800}
          style={styles.checkinButton}
          onPress={() => {
            navigation.navigate('IdScanner');
          }}>
          Tap to Check In
        </Button>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button
          style={styles.bottomButtons}
          mode="text"
          icon={'logout'}
          onPress={() => navigation.navigate('CheckOut')}>
          Check Out
        </Button>
        <Divider style={{width: 1, height: '100%'}} />
        <Button
          style={styles.bottomButtons}
          mode="text"
          onPress={() => {
            if (token) {
              navigation.reset({
                index: 0,
                routes: [{name: 'DrawerNav'}],
              });
            } else {
              navigation.navigate('AuthNav', {Screen: 'Auth'});
            }
          }}>
          {token ? 'Dashboard' : 'Log In'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    borderColor: 'black',
    borderWidth: 2,
    // backgroundColor: Color.accent,
  },
  logoContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: '55%',
    width: '100%',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: '3%',
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  checkinButton: {
    // borderColor: 'rgba(2,2,2,0.61)',
    borderWidth: 1,
    borderRadius: 20,
    width: '60%',
    // height: 40
  },
  bottomButtons: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 0,
  },
});

export default CheckInScreen;
