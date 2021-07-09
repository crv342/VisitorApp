import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { List, IconButton, Title } from "react-native-paper";
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import {checkout} from '../store/actions/visitor';

const CheckOutScreen = () => {
  const dispatch = useDispatch();

  const visitorList = useSelector(state => state.visitor.checkedInVisitors);
  const [visitors, setVisitors] = useState(visitorList);

  useEffect(() => {
    setVisitors(visitorList);
  }, [visitorList, dispatch]);
  const checkOutHandler = id => {
    dispatch(checkout(id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        {visitorList &&
          visitorList.map(item => (
            <List.Item
              key={item.id}
              titleStyle={styles.itemTitle}
              title={item.name}
              description={
                'Checked In ' +
                Math.round(
                  (((new Date() - new Date(item.checkIn)) % 86400000) %
                    3600000) /
                    60000,
                ) +
                ' minitues ago.'
              }
              left={props => (
                <List.Icon
                  {...props}
                  color={'rgba(50,76,102,0.91)'}
                  style={styles.icon}
                  icon="account-circle-outline"
                />
              )}
              right={props => (
                <IconButton
                  {...props}
                  color={Colors.primary}
                  size={24}
                  icon="logout"
                  onPress={() => checkOutHandler(item.id)}
                />
              )}
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
  itemTitle: {
    color: Colors.primary,
  },
  listContainer: {
    padding: '3%',
  },
  icon: {
    height: 30,
  },
});

export default CheckOutScreen;
