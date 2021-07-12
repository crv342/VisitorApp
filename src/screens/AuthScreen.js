import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Appbar,
  ActivityIndicator,
  HelperText,
  IconButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as loginActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const formSchema = yup.object({
  username: yup.string().required('username is required').min(3),
  password: yup.string().required('password is required').min(8),
});

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userIconColor, setUserIconColor] = useState('black');
  const [passIconColor, setPassIconColor] = useState('black');

  const submitHandler = async (username, password) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      await dispatch(loginActions.login(username, password));
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerNav'}],
      });
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
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
            isSubmitting,
            isValidating,
          }) => (
            <View style={styles.screen}>
              <Icon name={'admin-panel-settings'} size={34} />
              {error && (
                <View style={styles.errorContainer}>
                  <View style={styles.errorText}>
                    <HelperText
                      style={styles.errorText}
                      type="error"
                      visible={error ? true : false}>
                      {error}
                    </HelperText>
                  </View>
                  <View style={styles.errorCloseButton}>
                    <IconButton
                      icon={'close'}
                      size={13}
                      color={Colors.primary}
                      onPress={() => setError(false)}
                    />
                  </View>
                </View>
              )}

              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
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
              {isLoading ? (
                <Button mode={'text'}>
                  <ActivityIndicator />
                </Button>
              ) : (
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
              )}
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
  errorText: {
    // backgroundColor: '#fff',
    alignSelf: 'center',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  errorCloseButton: {
    marginRight: 0,
    right: 0,
    // width:13,
  },
  errorContainer: {
    height: 40,
    width: '80%',
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default AuthScreen;
