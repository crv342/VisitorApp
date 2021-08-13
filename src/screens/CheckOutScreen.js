import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {List, IconButton, Title, Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import {checkout} from '../store/actions/visitor';
import PushNotification from 'react-native-push-notification';

const CheckOutScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const Colors = useSelector(state => state.theme.colors);
  const visitorList = useSelector(state => state.visitor.checkedInVisitors);

  const checkOutHandler = (id, checkin) => {
    dispatch(checkout(id));
    PushNotification.cancelLocalNotifications({id: checkin});
  };

  const calculateTime = checkIn => {
    let diffInMilliSeconds = Math.abs(new Date() - new Date(checkIn)) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;
    // const time = Math.round(
    //   (((new Date() - new Date(checkIn)) % 86400000) % 3600000) / 60000,
    // );
    return difference;
  };
  if (visitorList.length === 0) {
    return (
      <View style={styles.screen}>
        <View>
          <Appbar.Header style={{backgroundColor: 'white'}}>
            <Appbar.BackAction
              color={Colors.primary}
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content
              title={'Check Out'}
              color={Colors.primary}
              style={{alignItems: 'center'}}
            />
            <Appbar.Action />
          </Appbar.Header>
        </View>
        <Title style={{alignSelf: 'center'}}>No Visitors to Check Out!</Title>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View>
        <Appbar.Header style={{backgroundColor: 'white'}}>
          <Appbar.BackAction
            color={Colors.primary}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title={'Check Out'}
            color={Colors.primary}
            style={{alignItems: 'center'}}
          />
          <Appbar.Action />
        </Appbar.Header>
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {visitorList &&
            visitorList.map(item => (
              <List.Item
                key={item.id}
                titleStyle={{...styles.itemTitle, color: Colors.primary}}
                title={item.name}
                description={
                  'Checked In ' + calculateTime(item.checkIn) + ' ago.'
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
                    onPress={() => checkOutHandler(item.id, item.checkIn)}
                  />
                )}
              />
            ))}
        </View>
      </ScrollView>
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
