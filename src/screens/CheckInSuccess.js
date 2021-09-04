import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Title} from 'react-native-paper';

const HomeScreen = props => {
  const {t} = useTranslation();
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
      <Image
        style={styles.gifStyle}
        source={require('../Image/approval.gif')}
      />
      <Title>{name}</Title>
      <Text> {t('is checked In')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gifStyle: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;
