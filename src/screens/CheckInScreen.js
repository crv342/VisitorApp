import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Text, Button, Divider, Title} from 'react-native-paper';

import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as visitorActions from '../store/actions/visitor';
import theme from '../store/reducers/theme';

const width = Dimensions.get('window').width;

const CheckInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const Colors = useSelector(state => state.theme.colors);
  const token = useSelector(state => state.auth.token);
  const userName = useSelector(state => state);
  // console.log(userName);
  useEffect(() => {
    dispatch(visitorActions.fetchCheckedIn()).catch(e => console.log(e));
  }, [dispatch]);
  return (
    <View style={{...styles.screen, backgroundColor: Colors.primary}}>
      {/* <StatusBar translucent={true} /> */}
      <View style={styles.upperContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'center'}
            // style={styles.logoStyle}
            source={require('../Image/logo.png')}
          />
          {/*<Title>VISITOR</Title>*/}
        </View>
      </View>
      <View style={{...styles.bottomContainer, shadowColor: Colors.text}}>
        <View style={styles.buttonContainer}>
          {/*<TouchableOpacity*/}
          {/*  style={styles.checkinButton}*/}
          {/*  onPress={() => {*/}
          {/*    navigation.navigate('IdScanner');*/}
          {/*  }}>*/}
          {/*  <Text>Tap to Check In</Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('IdScanner');
            }}>
            <View style={styles.halfUpperCircle}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                TAP
              </Text>
              <Text style={{...styles.upperText, color: Colors.primary}}>
                TO
              </Text>
            </View>
            <View
              style={{
                ...styles.halfLowerCircle,
                backgroundColor: Colors.primary,
                borderColor: Colors.primary,
              }}>
              <Text style={{...styles.lowerText, borderColor: Colors.primary}}>
                TO
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 19,
                  fontWeight: '700',
                }}>
                CHECK IN
              </Text>
            </View>
          </TouchableOpacity>

          {/*<Button*/}
          {/*  mode="contained"*/}
          {/*  // color={Colors.red800}*/}
          {/*  style={styles.checkinButton}>*/}

          {/*<View*/}
          {/*  style={{*/}
          {/*    justifyContent: 'center',*/}
          {/*    alignItems: 'center',*/}
          {/*  }}>*/}
          {/*  <Text style={{color: Colors.text}}>Tap</Text>*/}
          {/*  <Text style={{color: Colors.text}}>to </Text>*/}
          {/*  <Text style={{color: Colors.text}}>Check In</Text>*/}
          {/*</View>*/}
          {/*</Button>*/}
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            style={styles.bottomButtons}
            mode="text"
            icon={'logout'}
            onPress={() => navigation.navigate('CheckOut')}>
            Check Out
          </Button>
          <Divider
            style={{width: 1, height: '100%', backgroundColor: Colors.accent}}
          />
          <Button
            style={styles.bottomButtons}
            mode="text"
            onPress={() => {
              if (token) {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'DrawerNav'}],
                });
              } else {
                navigation.navigate('AuthNav', {Screen: 'Auth'});
              }
            }}>
            {token ? 'Dashboard' : 'Log In'}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    borderColor: 'black',
    borderWidth: 2,
  },
  upperContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Color.primary,
    // overflow: 'hidden',
  },
  bottomContainer: {
    flex: 1,
    zIndex: 3,
    marginTop: -15,
    width: '100%',
    // borderWidth: 2,
    elevation: 5,
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 8},
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderTopLeftRadius: 170,
    // borderTopRightRadius: 170,
    backgroundColor: 'white',
  },
  logoContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '-15%',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: -60,
    width: '100%',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: '3%',
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection: 'row',
  },
  checkinButton: {
    // borderColor: 'rgba(2,2,2,0.61)',
    borderWidth: 1,
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    // height: 40
  },
  halfUpperCircle: {
    borderColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: 120,
    height: 60,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  halfLowerCircle: {
    borderWidth: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    width: 120,
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  upperText: {
    fontSize: 18,
    marginBottom: Platform.OS === 'ios' ? -11.5 : -14,
    fontWeight: '700',
  },
  lowerText: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: Platform.OS === 'ios' ? -11.5 : -14,
    color: '#fff',
  },
  bottomButtons: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 0,
  },
});

export default CheckInScreen;
