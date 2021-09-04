import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ActivityIndicator, Appbar, Text} from 'react-native-paper';
import {updatePassword} from '../store/actions/auth';

const UpdatePassword = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changedPass, setChangedPass] = useState(false);

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
          <Appbar.BackAction onPress={() => navigation.goBack()} />
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
  },
});

export default UpdatePassword;
