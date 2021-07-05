import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

const VisitorLogScreen = ({navigation}) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'History'} />
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

export default VisitorLogScreen;
