import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import ItemPicker from '../components/ItemPicker';

import {Button, TextInput, HelperText, Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {checkin} from '../store/actions/visitor';
import Colors from '../constants/Colors';
import PushNotification from 'react-native-push-notification';

let vData;

const CheckInDetails = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState();
  const [visitorAddress, setVisitorAddress] = useState();
  const [visitorGender, setVisitorGender] = useState();
  const [visitorDOB, setVisitorDOB] = useState();
  const [hostValue, setHostValue] = useState();
  const [hostId, setHostId] = useState();
  const [purposeValue, setPurposeValue] = useState();
  const [visibleHost, setVisibleHost] = useState(false);
  const [visiblePurpose, setVisiblePurpose] = useState(false);
  const Colors = useSelector(state => state.theme.colors);
  const adminData = useSelector(state => state.auth.adminData);
  const purposeData = useSelector(state => state.host.purposes);
  const hostData = useSelector(state =>
    state.host.hosts.filter(h => h.status === true),
  );
  const [error, setError] = useState(false);

  if (props.route.params) {
    vData = props.route.params.data;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (typeof vData === 'string' && vData.startsWith('<')) {
        if (vData.startsWith('<?xml')) {
          vData = vData.slice(63, vData.length - 2).trim();
        } else if (vData.startsWith('<')) {
          vData = vData.slice(5, vData.indexOf('s="') - 1).trim();
        }
        console.log('pre' + vData);
        vData = vData.replace(/[,]/g, '?');
        vData = vData.replace(/[=]/g, '":');
        vData = '{"' + vData.replace(/" /g, ',"') + '}';
        vData = vData.replace(/[,]/g, '",');
        vData = vData.replace(/[?]/g, ',');
        console.log('before parse' + vData);
        vData = JSON.parse(vData);
        setVisitorName('name' in vData ? vData.name : vData.n);
        setVisitorAddress(
          'a' in vData
            ? vData.a
            : vData.house +
                ', ' +
                vData.street +
                ', ' +
                vData.lm +
                ', ' +
                vData.vtc +
                ', ' +
                vData.po +
                ', ' +
                vData.dist +
                ', ' +
                vData.subdist +
                ', ' +
                vData.state +
                ', ' +
                vData.pc,
        );
        setVisitorGender(
          'gender' in vData
            ? vData.gender.startsWith('M')
              ? 'Male'
              : 'Female'
            : vData.g.startsWith('M')
            ? 'Male'
            : 'Female',
        );
        setVisitorDOB('dob' in vData ? vData.dob : vData.d);
      }
    }, []);
  }

  const submitHandler = async () => {
    if (
      visitorName === '' ||
      hostValue === undefined ||
      purposeValue === undefined ||
      visitorPhone === undefined
    ) {
      setError('required field is empty!');
      return;
    }
    if (visitorPhone.length < 10) {
      setError('mobile number should be 10 numbers long');
      return;
    }
    let checkIn = new Date();
    let nTime =  1;
    dispatch(
      checkin(
        visitorName,
        visitorPhone,
        visitorAddress,
        visitorGender,
        visitorDOB,
        checkIn,
        '',
        hostValue,
        purposeValue,
        hostId,
      ),
    );
    // console.log(adminData.notifytime, typeof adminData.notifytime);
    PushNotification.localNotificationSchedule({
      id: checkIn,
      channelId: 'id1',
      message: `It's been ${nTime} hours.\n${visitorName} is not Checked Out yet`, // (required)
      date: new Date(Date.now() + 60 * 1000 * 60 * 1), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
    props.navigation.navigate('CheckInSuccess', {name: visitorName});
  };

  const closeMenu = () => {
    setVisibleHost(false);
    setVisiblePurpose(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: 'white'}}>
          <Appbar.BackAction
            color={Colors.primary}
            onPress={() => props.navigation.goBack()}
          />
          <Appbar.Content
            title={t('Check In Details')}
            color={Colors.primary}
            style={{alignItems: 'center'}}
          />
          <Appbar.Action />
        </Appbar.Header>
        {/*<ScrollView contentContainerStyle={styles.screen}>*/}
        {/*<View style={{height: '20%'}} />*/}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            label={`${t('Name')}*`}
            value={visitorName}
            onChangeText={t => {
              setVisitorName(t);
            }}
            onFocus={() => setError(false)}
          />
          {visitorAddress && (
            <TextInput
              style={{...styles.inputField}}
              label={`${t('Address')}*`}
              value={visitorAddress}
              editable={false}
              disabled={true}
              numberOfLines={3}
              multiline={true}
            />
          )}

          <TextInput
            textContentType={'telephoneNumber'}
            keyboardType={'number-pad'}
            style={{...styles.inputField}}
            label={`${t('Mobile')}*`}
            value={visitorPhone}
            onChangeText={t => {
              setVisitorPhone(t);
            }}
            maxLength={10}
            left={<TextInput.Affix text={'+91 '} />}
          />
          <ItemPicker
            itemData={hostData}
            onFocus={() => {
              setError(false);
              setVisibleHost(true);
            }}
            value={hostValue}
            setValue={setHostValue}
            setId={setHostId}
            visible={visibleHost}
            onDismiss={closeMenu}
            lable={`${t('Host')}*`}
          />
          <ItemPicker
            itemData={purposeData}
            onFocus={() => {
              setError(false);
              setVisiblePurpose(true);
            }}
            value={purposeValue}
            setValue={setPurposeValue}
            visible={visiblePurpose}
            onDismiss={closeMenu}
            lable={`${t('Purpose')}*`}
          />

          <View style={{alignItems: 'center', marginTop: 30}}>
            <HelperText
              style={styles.errorText}
              type="error"
              visible={error ? true : false}>
              {error}
            </HelperText>
            <Button
              mode={'contained'}
              style={styles.button}
              onPress={submitHandler}>
              {`${t('Next')}`}
            </Button>
          </View>
        </View>
        {/*</ScrollView>*/}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: 100,
  },
  inputField: {
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  otherData: {
    marginTop: 10,
    width: 300,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderBottomEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
});

export default CheckInDetails;
