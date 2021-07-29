import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {
  Appbar,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  Title,
  List,
  IconButton,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchDetails,
  removePurpose,
  updatePurpose,
} from '../store/actions/host';
import * as authActions from '../store/actions/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import Colors, {changeColors} from '../constants/Colors';
import {updateTheme} from '../store/actions/theme';
import CustomSwitch from '../components/CustomSwitch';

const SettingScreen = ({navigation}) => {
  const adminData = useSelector(state => state.auth.adminData);
  const Colors = useSelector(state => state.theme.colors);
  const setPass = useSelector(state => state.auth.setPass);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(adminData.username);
  const [email, setEmail] = useState(adminData.email);
  // const [phone, setPhone] = useState(adminData.phone);
  const [notifyTime, setNotifyTime] = useState(adminData.notifytime.toString());
  const [purpose, setPurpose] = useState('');
  const [currPass, setCurrPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uPassModal, setUPassModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [themePrimaryColor, setThemePrimaryColor] = useState(Colors.primary);
  const [themeAccentColor, setThemeAccentColor] = useState(Colors.accent);
  const [colorModal, setColorModal] = useState(false);
  const [switchValue, setSwitchValue] = useState(1);
  const [value, onChange] = useState('10:00');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  // useEffect(() => {
  //   if (setPass) {
  //     navigation.navigate('AuthNav', {screen: 'Update Pass'});
  //   }
  // }, [navigation, setPass]);

  const purposeData = useSelector(state => state.host.purposes);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showColorModal = () => setColorModal(true);
  const hideColorModal = () => {
    setSwitchValue(1);
    setColorModal(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    await dispatch(
      authActions.updateAdmin({username, email, notifytime: notifyTime}),
    );
    setLoading(false);
  };

  const addPurposeHandler = async () => {
    if (purpose === '' || purpose === undefined) {
      return;
    } else {
      setLoadingModal(true);
      await dispatch(updatePurpose(purpose));
      setLoadingModal(false);
      setPurpose('');
    }
  };

  const passButtonHandler = async () => {
    try {
      if (currPass === '' || currPass === undefined) {
        Alert.alert(
          Alert,
          'Please enter current password.',
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK Pressed'),
              style: 'Ok',
            },
          ],
          {
            cancelable: true,
          },
        );
        return;
      }
      setLoadingModal(true);
      await dispatch(authActions.checkPass(currPass));
      setLoadingModal(false);
      hideModal();
      setCurrPass('');
      navigation.navigate('AuthNav', {screen: 'Update Pass'});
    } catch (e) {
      setCurrPass('');
      setLoadingModal(false);
      Alert.alert(
        e.message,
        'Please enter correct password.',
        [
          {
            text: 'Ok',
            onPress: () => console.log('OK Pressed'),
            style: 'Ok',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const onSelectSwitch = index => {
    setSwitchValue(index);
  };

  const changeColorHandler = color => {
    if (switchValue === 1) {
      setThemePrimaryColor(color);
    }
    if (switchValue === 2) {
      setThemeAccentColor(color);
    }
  };

  const themeColorHandler = async color => {
    if (switchValue === 1) {
      await dispatch(updateTheme(color, Colors.accent));
      // setThemePrimaryColor(color);
    }
    if (switchValue === 2) {
      await dispatch(updateTheme(Colors.primary, color));
      // setThemeAccentColor(color);
    }

    // hideColorModal();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Action
            icon={'menu'}
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title={'Settings'} />
        </Appbar.Header>

        <View style={styles.screen}>
          <Title>Admin Details</Title>
          <TextInput
            autoCapitalize={'none'}
            mode={'outlined'}
            style={styles.inputField}
            label={'Username'}
            value={username}
            onChangeText={t => {
              setUsername(t);
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            mode={'outlined'}
            style={styles.inputField}
            label={'Email'}
            value={email}
            onChangeText={t => {
              setEmail(t);
            }}
          />
          {/*<TextInput*/}
          {/*  mode={'outlined'}*/}
          {/*  style={styles.inputField}*/}
          {/*  label={'phone'}*/}
          {/*  value={phone}*/}
          {/*  onChangeText={t => {*/}
          {/*    setPhone(t);*/}
          {/*  }}*/}
          {/*/>*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '5%',
            }}>
            <Text>Notify Time</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TextInput
                allowFontScaling={true}
                keyboardType={'numeric'}
                mode={'outlined'}
                style={{...styles.inputField, width: 40, height: 40}}
                // label={'phone'}
                value={notifyTime}
                onChangeText={t => {
                  setNotifyTime(t);
                }}
              />
              <Text> Hours</Text>
            </View>
          </View>
          {loading && <ActivityIndicator style={styles.inputField} />}

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}>
              {uPassModal ? (
                <View>
                  <Title>Update Password</Title>
                  <View>
                    <TextInput
                      placeholder={'Enter Current Password'}
                      autoCapitalize={'none'}
                      mode={'outlined'}
                      style={{...styles.inputField}}
                      value={currPass}
                      onChangeText={t => {
                        setCurrPass(t);
                      }}
                    />
                    <Button
                      loading={loadingModal}
                      style={{...styles.inputField, width: 100}}
                      mode={'contained'}
                      color={Colors.primary}
                      onPress={passButtonHandler}>
                      Next
                    </Button>
                  </View>
                </View>
              ) : (
                <>
                  <Title>Purposes</Title>
                  {purposeData &&
                    purposeData.map(item => (
                      <List.Item
                        key={item._id}
                        style={styles.listItem}
                        title={item.name}
                        right={props => (
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(removePurpose(item._id));
                            }}>
                            <List.Icon {...props} icon="close" />
                          </TouchableOpacity>
                        )}
                      />
                    ))}

                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      autoCapitalize={'none'}
                      mode={'outlined'}
                      style={{...styles.inputField, width: '80%'}}
                      value={purpose}
                      onChangeText={t => {
                        setPurpose(t);
                      }}
                    />
                    <Button
                      style={styles.addButton}
                      mode={'contained'}
                      color={Colors.primary}
                      onPress={addPurposeHandler}>
                      {loadingModal ? (
                        <View>
                          <ActivityIndicator color={'white'} />
                        </View>
                      ) : (
                        <Icon size={24} name={'plus'} />
                      )}
                    </Button>
                  </View>
                </>
              )}
            </Modal>
          </Portal>
          <Portal>
            <Modal
              style={{flex: 1}}
              visible={colorModal}
              onDismiss={hideColorModal}
              contentContainerStyle={{
                ...styles.containerStyle,
                height: '50%',
                backgroundColor: '#dedede',
              }}>
              <ColorPicker
                color={switchValue === 1 ? themePrimaryColor : themeAccentColor}
                oldColor={switchValue === 1 ? Colors.primary : Colors.accent}
                onColorSelected={color => themeColorHandler(color)}
                onColorChange={color => changeColorHandler(color)}
                style={{flex: 1}}
              />
              <View style={{alignItems: 'center', margin: 5}}>
                <CustomSwitch
                  selectionMode={1}
                  roundCorner={true}
                  option1={'Primary'}
                  option2={'Accent'}
                  onSelectSwitch={onSelectSwitch}
                  selectionColor={Colors.primary}
                />
              </View>
            </Modal>
          </Portal>

          <Button
            // color={Colors.primary}
            mode={'contained'}
            style={styles.inputField}
            onPress={submitHandler}>
            Save
          </Button>
          <Button
            // color={Colors.primary}
            mode={'outlined'}
            style={styles.inputField}
            onPress={() => {
              setUPassModal(false);
              showModal();
            }}>
            Purposes
          </Button>
          <Button
            onPress={() => {
              setUPassModal(true);
              showModal();
            }}>
            Update Password
          </Button>
          <Divider />
          <View style={styles.updateThemeContainer}>
            <Text style={{fontSize: 16}}>Change Theme</Text>
            <IconButton
              icon={'format-color-fill'}
              onPress={showColorModal}
              color={Colors.primary}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  inputField: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 4,
    color: Colors.primary,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  addButton: {
    margin: 7,
    justifyContent: 'center',
  },
  updateThemeContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingScreen;
