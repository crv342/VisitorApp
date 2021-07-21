import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Button, Text, Divider} from 'react-native-paper';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const IdScanner = ({navigation}) => {
  const Colors = useSelector(state => state.theme.colors);
  const onSuccess = e => {
    navigation.navigate('CheckInDetails', {data: e.data});
    console.log(e);
    console.log(e.data);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occurred', err),
    // );
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <>
          <View style={styles.topContainer}>
            <View>
              <Button onPress={() => navigation.goBack()}>
                <View style={styles.buttonContainer}>
                  <Icons
                    size={24}
                    name={'chevron-left-circle-outline'}
                    color={Colors.primary}
                  />
                  <Text style={{color: Colors.primary}}> Back</Text>
                </View>
              </Button>
            </View>
            <View>
              <Button onPress={() => navigation.navigate('CheckInDetails')}>
                <View style={styles.buttonContainer}>
                  <Text style={{color: Colors.primary}}>Skip </Text>
                  <Icons
                    size={24}
                    name={'skip-next-circle-outline'}
                    color={Colors.primary}
                  />
                </View>
              </Button>
            </View>
          </View>
          <Divider />
        </>
      }
      bottomContent={
        <View style={styles.bottomContainer}>
          {/*<View style={styles.bottomButtomLeft}>*/}
          {/*  <Button onPress={() => navigation.goBack()}>*/}
          {/*    <Icon size={24} name={'navigate-before'} />*/}
          {/*  </Button>*/}
          {/*</View>*/}
          <View style={styles.bottomText}>
            <Text style={styles.buttonText}>Scan Id Card</Text>
          </View>
          {/*<View style={styles.bottomButtomRight}>*/}
          {/*  <Button onPress={() => navigation.navigate('CheckInDetails')}>*/}
          {/*    <Icons size={24} name={'skip-next-circle-outline'} />*/}
          {/*  </Button>*/}
          {/*</View>*/}
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
});

// AppRegistry.registerComponent('default', () => ScanScreen);
export default IdScanner;
