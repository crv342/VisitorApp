// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Text} from 'react-native-paper';
//
// const IdScanner = () => {
//   return (
//     <View>
//       <Text>scanner</Text>
//     </View>
//   );
// };
//
// export default IdScanner;

'use strict';

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const IdScanner = ({navigation}) => {
  const onSuccess = e => {
    navigation.navigate('CheckInDetails', {data: e.data});
    console.log(e.data);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occurred', err),
    // );
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={<Text style={styles.centerText} />}
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Scan Id Card</Text>
        </TouchableOpacity>
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
    marginTop: '15%',
  },
  buttonTouchable: {
    padding: 5,
  },
});

// AppRegistry.registerComponent('default', () => ScanScreen);
export default IdScanner;
