import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text, Surface} from 'react-native-paper';

const EmployeeList = ({navigation}) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Employee List'} />
      </Appbar.Header>

      <Surface style={styles.surface}>
        <Text>Surface</Text>
      </Surface>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default EmployeeList;
