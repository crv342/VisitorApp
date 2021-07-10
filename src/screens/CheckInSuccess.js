import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Appbar, Title} from 'react-native-paper';
import Colors from '../constants/Colors';

const HomeScreen = props => {
  const name = props.route.params.name;

  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'CheckInNav'}],
      });
    }, 2000);
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      <Image source={require('../Image/success.png')} />
      <Title>{name}</Title>
      <Text> is checked In</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
});

export default HomeScreen;
