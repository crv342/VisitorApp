import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Text, TextInput, Button, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userIconColor, setUserIconColor] = useState('black');
  const [passIconColor, setPassIconColor] = useState('black');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        {/*<Appbar.Header>*/}
        {/*  <Appbar.Action icon={'arrow-left'} />*/}
        {/*</Appbar.Header>*/}
        <View style={styles.screen}>
          <Icon name={'admin-panel-settings'} size={34} />
          <TextInput
            left={<TextInput.Icon name="account" color={userIconColor} />}
            // mode='outlined'
            placeholder="username"
            style={styles.inputField}
            lable="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            onFocus={() => setUserIconColor('#C1403D')}
            onBlur={() => setUserIconColor('black')}
          />
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
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setPassIconColor('#C1403D')}
            onBlur={() => setPassIconColor('black')}
          />
          <Button
            mode="contained"
            raised
            theme={{roundness: 3}}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'DrawerNav'}],
              })
            }>
            LogIn
          </Button>
        </View>
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
