import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button, Text} from 'react-native-paper';
import Colors from '../constants/Colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const IdScanner = ({navigation}) => {
  const {t} = useTranslation();
  const Colors = useSelector(state => state.theme.colors);
  const onSuccess = e => {
    navigation.navigate('CheckInDetails', {data: e.data});
  };

  return (
    <QRCodeScanner
      showMarker={true}
      onRead={onSuccess}
      topContent={
        <View style={styles.topContainer}>
          <View>
            <Button
              onPress={() => navigation.goBack()}
              icon={() => (
                <View style={styles.buttonContainer}>
                  <Icons
                    size={24}
                    name={'chevron-left-circle-outline'}
                    color={Colors.primary}
                  />
                  <Text style={{color: Colors.primary}}> {t('Back')}</Text>
                </View>
              )}
            />
          </View>
          <View>
            <Button
              onPress={() => navigation.navigate('CheckInDetails')}
              icon={() => (
                <View style={styles.buttonContainer}>
                  <Text style={{color: Colors.primary}}> {t('Skip')} </Text>
                  <Icons
                    size={24}
                    name={'skip-next-circle-outline'}
                    color={Colors.primary}
                  />
                </View>
              )}
            />
          </View>
        </View>
      }
      bottomContent={
        <View style={styles.bottomContainer}>
          <View style={styles.bottomText}>
            <Text style={{...styles.buttonText, color: Colors.primary}}>
              {t('Scan Id Card')}
            </Text>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#ccc',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: '#000',
    // marginTop: '15%',
  },
  topContainer: {
    width: '100%',
    // height: 70,
    marginTop: -60,
    flexDirection: 'row',
    // padding: 5,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    color: Colors.primary,
  },
  bottomText: {
    padding: 5,
    alignSelf: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: 70,
    marginBottom: -60,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
  },
  bottomButtomLeft: {
    marginLeft: 2,
    borderColor: Colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
  },
  bottomButtomRight: {
    marginRight: 0,
    borderColor: Colors.primary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraStyle: {
    height: '80%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
});

// AppRegistry.registerComponent('default', () => ScanScreen);
export default IdScanner;
