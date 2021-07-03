import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text as text} from 'react-native';
import {Text} from 'react-native-paper';

import Colors from '../constants/Colors';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('CheckIn');
    }, 1000);
  }, []);

  return (
    <View style={styles.screen}>
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
    backgroundColor: Colors.primary,
    flexDirection: 'row',
  },
});

export default SplashScreen;
