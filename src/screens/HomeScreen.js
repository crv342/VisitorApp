import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  // const userName = useSelector(state => state.auth.adminData.username);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Dashboard'} />
      </Appbar.Header>

      {/*<Text>{userName}</Text>*/}
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
