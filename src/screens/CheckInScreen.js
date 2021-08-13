import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import {Text, Button, Divider, Title, IconButton} from 'react-native-paper';

import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as visitorActions from '../store/actions/visitor';

const width = Dimensions.get('window').width;

const CheckInScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const Colors = useSelector(state => state.theme.colors);
  const token = useSelector(state => state.auth.token);
  const animated = new Animated.Value(1);
  const opacityA = new Animated.Value(1);
  const animated2 = new Animated.Value(1);
  const opacityA2 = new Animated.Value(1);

  useEffect(() => {
    Animated.stagger(2000, [
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated, {
            toValue: 1.5,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(opacityA, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ),

      Animated.loop(
        Animated.parallel([
          Animated.timing(animated2, {
            toValue: 1.5,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(opacityA2, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ),
    ]).start();
  });

  useEffect(() => {
    dispatch(visitorActions.fetchCheckedIn()).catch(e => console.log(e));
  }, [dispatch]);

  return (
    <View style={{...styles.screen, backgroundColor: 'white'}}>
      {/* <StatusBar translucent={true} /> */}
      {/* <View style={{alignSelf:'flex-start',zIndex: 10000, marginTop: 35}}>
          <Button>Ln</Button>
      </View> */}
      <View style={{...styles.upperContainer, marginTop: -35}}>
        <View style={styles.logoContainer}>
          <View
            style={
              {
                // backgroundColor: '#fff',
                // width: 200,
                // height: 100,
              }
            }>
            <Image
              resizeMode={'center'}
              style={{alignSelf: 'center'}}
              // style={styles.logoStyle}
              source={require('../Image/logo.png')}
            />
          </View>
          {/*<Title>VISITOR</Title>*/}
        </View>
      </View>
      <View style={{...styles.bottomContainer, shadowColor: Colors.text, backgroundColor: Colors.primary}}>
        <View style={styles.buttonContainer}>
          {/*<TouchableOpacity*/}
          {/*  style={styles.checkinButton}*/}
          {/*  onPress={() => {*/}
          {/*    navigation.navigate('IdScanner');*/}
          {/*  }}>*/}
          {/*  <Text>Tap to Check In</Text>*/}
          {/*</TouchableOpacity>*/}
          <Animated.View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: Colors.accent,
              opacity: opacityA,
              transform: [
                {
                  scale: animated,
                },
              ],
            }}>
            <Animated.View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: Colors.accent,
                opacity: opacityA2,
                transform: [
                  {
                    scale: animated2,
                  },
                ],
              }}
            />
          </Animated.View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              zIndex: 2,
              marginTop: -120,
              // elevation: 5,
              // shadowRadius: 12,
              // shadowOpacity: 0.5,
              // shadowOffset: {width: 0, height: 8},
            }}
            onPress={() => {
              navigation.navigate('IdScanner');
            }}>
            <View style={{
              ...styles.halfUpperCircle,
            backgroundColor: Colors.primary,
            borderColor: Colors.primary
            }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: Platform.OS === 'ios' ? 20 : 18,
                  fontWeight: '700',
                }}>
                TAP
              </Text>
              <Text style={{...styles.upperText, color: 'white'}}>
                TO
              </Text>
            </View>
            <View
              style={{
                ...styles.halfLowerCircle,
                backgroundColor: 'white',
                borderColor: 'white',
              }}>
              <Text style={{...styles.lowerText, borderColor: 'white', color: Colors.primary}}>
                TO
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: Platform.OS === 'ios' ? 19 : 17,
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
            color='#fff'
            style={styles.bottomButtons}
            mode="text"
            icon={'logout'}
            onPress={() => navigation.navigate('CheckOut')}>
            { t("Check Out") }
          </Button>
          <Divider
            style={{width: 1, height: '100%', backgroundColor: Colors.accent}}
          />
          <Button
          color='#fff'
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
            {token ? t('Dashboard') : t('Log In')}
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
    marginTop: Platform.OS === 'android' ? 0 : -15,
    // marginTop: -15,
    margin: Platform.OS === 'android' ? 1 : 0,
    width: '100%',
    // borderWidth: 2,
    shadowColor: '#000',
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 8},
    elevation: 5,
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
    margin: Platform.OS === 'android' ? 1 : 0,
    borderColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: 120,
    height: 60,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 8},
    elevation: 5,
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
    elevation: 5,
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowOffset: {width: 8, height: 0},
    shadowColor: '#000000',
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
