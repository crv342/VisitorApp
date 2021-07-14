import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Button as B,
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
  ActivityIndicator
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchDetails,
  removePurpose,
  updatePurpose,
} from '../store/actions/host';
import * as authActions from '../store/actions/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

const SettingScreen = ({navigation}) => {
  const adminData = useSelector(state => state.auth.adminData);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(adminData.username);
  const [email, setEmail] = useState(adminData.email);
  // const [phone, setPhone] = useState(adminData.phone);
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const purposeData = useSelector(state => state.host.purposes);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const submitHandler = async () => {
    setLoading(true);
    await dispatch(authActions.updateAdmin({username, email}));
    setLoading(false);
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
            label={'username'}
            value={username}
            onChangeText={t => {
              setUsername(t);
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            mode={'outlined'}
            style={styles.inputField}
            label={'email'}
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
          {loading && <ActivityIndicator style={styles.inputField} />}

          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}>
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
                    onPress={() => {
                      dispatch(updatePurpose(purpose));
                      setPurpose('');
                    }}>
                    <Icon size={24} name={'plus'} />
                  </Button>
                </View>
              </Modal>
            </Portal>
            <Button
              color={Colors.primary}
              mode={'contained'}
              style={styles.inputField}
              onPress={submitHandler}>
              Save
            </Button>
            <Button
              color={Colors.primary}
              mode={'outlined'}
              style={styles.inputField}
              onPress={showModal}>
              Purposes
            </Button>
          </Provider>
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
});

export default SettingScreen;
