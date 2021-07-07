import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Text, TextInput, Button, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as loginActions from '../store/actions/auth';

const formSchema = yup.object({
  username: yup.string().required('username is required').min(3),
  password: yup.string().required('password is required').min(8),
});

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [userIconColor, setUserIconColor] = useState('black');
  const [passIconColor, setPassIconColor] = useState('black');

  const submitHandler = async (username, password) => {
    const res = await dispatch(loginActions.login(username, password));
    navigation.reset({
      index: 0,
      routes: [{name: 'DrawerNav'}],
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        {/*<Appbar.Header>*/}
        {/*  <Appbar.Action icon={'arrow-left'} />*/}
        {/*</Appbar.Header>*/}
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={formSchema}
          onSubmit={values => submitHandler(values.username, values.password)}>
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.screen}>
              <Icon name={'admin-panel-settings'} size={34} />
              <TextInput
                left={<TextInput.Icon name="account" color={userIconColor} />}
                // mode='outlined'
                placeholder="username"
                style={styles.inputField}
                lable="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onFocus={() => setUserIconColor('#C1403D')}
                onBlur={() => {
                  setUserIconColor('black');
                  setFieldTouched('username');
                  // handleBlur('username');
                }}
              />
              {touched.username && errors.username && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.username}
                </Text>
              )}
              <TextInput
                left={<TextInput.Icon name="lock" color={passIconColor} />}
                sectionColor="#fff"
                icon="camera"
                theme={{background: '#fff'}}
                placeholder="password"
                style={styles.inputField}
                right={<TextInput.Icon name="eye" />}
                lable="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onFocus={() => setPassIconColor('#C1403D')}
                onBlur={() => {
                  setPassIconColor('black');
                  setFieldTouched('password');
                }}
              />
              {touched.password && errors.password && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.password}
                </Text>
              )}
              <Button
                mode="contained"
                raised
                theme={{roundness: 5}}
                onPress={handleSubmit}
                // onPress={() =>
                // navigation.reset({
                //   index: 0,
                //   routes: [{name: 'DrawerNav'}],
                // })}
              >
                LogIn
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputField: {
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default AuthScreen;
