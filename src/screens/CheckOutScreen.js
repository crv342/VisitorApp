import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';

const CheckOutScreen = () => {
  const dispatch = useDispatch();
  const visitorList = useSelector(state => state.visitor.checkedInVisitors);
  console.log(visitorList);

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        {visitorList &&
          visitorList.map(item => (
            <List.Item
              title={item.name}
              description={
                'Checked In ' +
                Math.round(
                  (((new Date() - item.checkIn) % 86400000) % 3600000) / 60000,
                ) +
                ' minitues ago.'
              }
              left={props => (
                <List.Icon
                  color={Colors.primary}
                  style={styles.icon}
                  {...props}
                  icon="account-circle-outline"
                />
              )}
              right={props => <List.Icon {...props} icon="logout" />}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    padding: '3%',
  },
  icon: {
    height: 30,
  },
});

export default CheckOutScreen;
