import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  Appbar,
  Text,
  Surface,
  IconButton,
  Modal,
  Title,
  Divider,
  Portal,
  TextInput,
  Button,
  ActivityIndicator,
  Switch,
  HelperText,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as hostActions from '../store/actions/host';
import Colors from '../constants/Colors';

const HostList = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const [addHost, setAddHost] = useState(false);
  const hostData = useSelector(state => state.host.hosts);
  const [hosts, setHosts] = useState(hostData);
  const [sendemail, setSendEmailOn] = useState(false);

  const onToggleSwitch = () => setSendEmailOn(!sendemail);

  useEffect(() => {
    setHosts(hostData);
  }, [hostData]);

  const showModal = data => {
    if (data) {
      setId(data.id);
      setName(data.name);
      setPhone(data.phone.toString());
      setEmail(data.email);
      setSendEmailOn(data.sendemail);
    } else {
      setId();
      setName();
      setPhone();
      setEmail();
    }
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const submitHandler = async type => {
    if (
      name === undefined ||
      phone === undefined ||
      name === null ||
      phone === null
    ) {
      setError("required field can't be empty");
      return;
    }

    if (type === 'add') {
      setLoading(true);
      await dispatch(hostActions.addHost(name, phone, email, sendemail));
    } else if (type === 'update') {
      setLoading(true);
      await dispatch(
        hostActions.updateHost(id, {
          name,
          phone,
          email,
          sendemail,
        }),
      );
    } else {
      setLoadingDelete(true);
      await dispatch(hostActions.deleteHost(id));
    }
    setLoadingDelete(false);
    setLoading(false);
    hideModal();
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Host List'} />
        <Appbar.Action
          icon={'plus'}
          onPress={() => {
            setAddHost(true);
            showModal();
          }}
        />
      </Appbar.Header>
      <View style={styles.screen}>
        <ScrollView>
          <View>
            {hosts.map((data, i) => (
              <Surface key={data.id} style={styles.surface}>
                <View style={styles.textStyle}>
                  <Text>{i + 1 + '. ' + data.name}</Text>
                </View>
                <View style={styles.buttonStyle}>
                  <IconButton
                    icon={'square-edit-outline'}
                    color={'green'}
                    onPress={() => {
                      setAddHost(false);
                      showModal(data);
                    }}
                  />
                </View>
              </Surface>
            ))}
          </View>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}>
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                  <Title>Host Details</Title>
                </View>
                <Divider />
                <View style={styles.switchContainer}>
                  <Text>Send Email </Text>
                  <Switch
                    color={Colors.primary}
                    value={sendemail}
                    onValueChange={onToggleSwitch}
                  />
                </View>

                <TextInput
                  mode={'outlined'}
                  style={styles.inputField}
                  label={'Name*'}
                  value={name}
                  onChangeText={t => {
                    setName(t);
                  }}
                  onFocus={() => setError(false)}
                />
                <TextInput
                  maxLength={10}
                  keyboardType={'numeric'}
                  mode={'outlined'}
                  style={styles.inputField}
                  label={'Phone*'}
                  value={phone}
                  onChangeText={t => {
                    setPhone(t);
                  }}
                  onFocus={() => setError(false)}
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
                {error && (
                  <HelperText
                    style={styles.errorText}
                    type="error"
                    visible={error ? true : false}>
                    {error}
                  </HelperText>
                )}
                {addHost ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      loading={loading}
                      mode={'contained'}
                      color={'#349822'}
                      onPress={() => submitHandler('add')}>
                      add
                    </Button>
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <Button
                      loading={loading}
                      mode={'contained'}
                      color={'#349822'}
                      icon={'square-edit-outline'}
                      onPress={() => submitHandler('update')}>
                      update
                    </Button>
                    <Button
                      loading={loadingDelete}
                      mode={'contained'}
                      color={'#be1717'}
                      icon={'delete-outline'}
                      onPress={() => submitHandler('delete')}>
                      delete
                    </Button>
                  </View>
                )}
              </View>
            </Modal>
          </Portal>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  surface: {
    marginTop: '4%',
    marginBottom: 2,
    padding: '1%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  textStyle: {
    alignItems: 'flex-start',
    marginLeft: '5%',
    // fontSize: Dimensions.get('window').width * 0.04,
  },
  buttonStyle: {},
  inputField: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 4,
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorText: {
    marginLeft: '5%',
  },
  switchContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 4,
  },
});

export default HostList;
