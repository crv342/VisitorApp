import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {
  ActivityIndicator,
  Appbar,
  Button,
  IconButton,
  Text,
} from 'react-native-paper';
import {UPDATEPASSWORD, updatePassword} from '../store/actions/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UpdatePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changedPass, setChangedPass] = useState(false);
  // const hasUnsavedChanges = Boolean(text);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (changedPass) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          'Are You Sure?',
          'You are leaving screen without updating password. Are you sure to leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, changedPass],
  );
  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      dispatch({
        type: UPDATEPASSWORD,
        setPassword: false,
        resToken: null,
      });
    });
  });
  // useEffect(() => {});

  const submitHandler = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert(
          'Password does not match!',
          'Please enter same input in both field.',
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

      setIsLoading(true);
      await dispatch(updatePassword(newPassword));
      setChangedPass(true);
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      setIsLoading(false);
      Alert.alert(e.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction
            // icon={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content title={'Update Password'} />
          {isLoading ? (
            <ActivityIndicator
              color={'white'}
              style={{marginRight: '3.5%', marginLeft: '3%'}}
            />
          ) : (
            <Appbar.Action
              icon={'content-save-outline'}
              onPress={submitHandler}
            />
          )}
        </Appbar.Header>
        <View style={styles.screen}>
          <Text style={{margin: 15, fontSize: 16}}>Update Password</Text>
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize={'none'}
            allowFontScaling={true}
            style={styles.inputField}
            placeholder={'New Password'}
            value={newPassword}
            onChangeText={t => {
              setNewPassword(t);
            }}
          />
          <TextInput
            autoCorrect={false}
            autoCapitalize={'none'}
            allowFontScaling={true}
            style={styles.inputField}
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={t => {
              setConfirmPassword(t);
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: '3%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputField: {
    alignSelf: 'center',
    width: '90%',
    height: 40,
    margin: '3%',
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    fontSize: 15,
    paddingLeft: 6,
    // borderWidth: 1,
  },
});

export default UpdatePassword;
