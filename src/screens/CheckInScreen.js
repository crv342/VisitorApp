import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, Button, Colors, Divider} from 'react-native-paper';

import Color from '../constants/Colors';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-vector-icons/MaterialIcons';

const CheckInScreen = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const userName = useSelector(state => state);
  console.log(userName);
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          // color={Colors.red800}
          style={styles.checkinButton}
          onPress={() => {
            navigation.navigate('CheckInDetails');
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
              navigation.navigate('DrawerNav');
            } else {
              navigation.navigate('AuthNav', {Screen: 'Auth'});
            }
          }}>
          {token ? ' Go to Dashboard' : 'Log In'}
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
    backgroundColor: Color.accent,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: '80%',
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
