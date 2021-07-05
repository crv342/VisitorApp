import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Colors} from 'react-native-paper';

import Color from '../constants/Colors';

const CheckInScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Button
        mode="contained"
        color={Colors.red800}
        style={styles.checkinButton}
        onPress={() => {
          navigation.navigate('CheckInDetails');
        }}>
        Tap to Check In
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('AuthNav', {Screen: 'Auth'})}>
        Log In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Color.accent,
  },
  checkinButton: {
    marginTop: '80%',
    borderColor: 'rgba(2,2,2,0.61)',
    borderWidth: 1,
    borderRadius: 20,
    width: '60%',
    // height: 40
  },
});

export default CheckInScreen;
