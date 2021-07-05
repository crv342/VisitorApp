import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Appbar} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Dashboard'} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
