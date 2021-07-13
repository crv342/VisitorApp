import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text, Surface} from 'react-native-paper';
import {useSelector} from 'react-redux';

const EmployeeList = ({navigation}) => {
  const hostData = useSelector(state => state.host.hosts);
  console.log(hostData);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Employee List'} />
      </Appbar.Header>

      <View style={styles.screen}>
        {hostData.map(data => (
          <Surface key={data.id} style={styles.surface}>
            <Text>{data.name}</Text>
            <View></View>
          </Surface>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  surface: {
    padding: 8,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default EmployeeList;
