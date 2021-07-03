import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

const AuthScreen = () => {
  const [username, setUsername] = useState('');

  return (
    <View>
      <TextInput
        lable="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
    </View>
  );
};

export default AuthScreen;
