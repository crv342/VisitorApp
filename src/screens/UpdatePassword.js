import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text as text, Text} from 'react-native';

import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';

const SplashScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {});

  return (
    <View style={styles.screen}>
      <Text>Update Password</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
  },
});

export default SplashScreen;
