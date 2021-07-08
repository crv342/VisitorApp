import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ItemPicker from '../components/ItemPicker';
import {Picker} from '@react-native-picker/picker';

import {Divider, Menu, Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';

const CheckInDetails = () => {
  const dispatch = useDispatch();
  const [hostValue, setHostValue] = useState();
  const [purposeValue, setPurposeValue] = useState();
  const [visibleHost, setVisibleHost] = useState(false);
  const [visiblePurpose, setVisiblePurpos] = useState(false);

  const dataHost = [
    {
      _id: 'wfwf',
      name: 'crv',
    },
    {
      _id: 'dgfg',
      name: 'abc',
    },
  ];
  const dataPurpose = [
    {
      _id: 'p1',
      name: 'meeting',
    },
    {
      _id: 'p2',
      name: 'interview',
    },
  ];

  const submitHandler = async () => {};

  // const openMenu = () => setVisible(true);
  //
  const closeMenu = () => {
    setVisibleHost(false);
    setVisiblePurpos(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={{height: '25%'}} />
        {/*<View style={styles.formContainer}>*/}
        {/*<TextInput value={host} onFocus={() => openMenu()} />*/}
        {/*<View style={styles.menuContainer}>*/}
        {/*  <Menu*/}
        {/*    style={styles.menuSelect}*/}
        {/*    visible={visible}*/}
        {/*    onDismiss={closeMenu}*/}
        {/*    anchor={*/}
        {/*      <TextInput*/}
        {/*        style={styles.inputShow}*/}
        {/*        keyboardAppearance={false}*/}
        {/*        showSoftInputOnFocus={false}*/}
        {/*        label={'Select a Host'}*/}
        {/*        value={host}*/}
        {/*        onFocus={() => {*/}
        {/*          openMenu();*/}
        {/*        }}*/}
        {/*        keyboardType={null}*/}
        {/*      />*/}
        {/*      // <Button mode={'outlined'} onPress={openMenu}>*/}
        {/*      //   Select Host*/}
        {/*      // </Button>*/}
        {/*    }>*/}
        {/*    <Menu.Item*/}
        {/*      style={styles.menuSelect}*/}
        {/*      onPress={() => {}}*/}
        {/*      title="Item 1"*/}
        {/*    />*/}
        {/*    <Menu.Item*/}
        {/*      style={styles.menuSelect}*/}
        {/*      onPress={() => {}}*/}
        {/*      title="Item 2"*/}
        {/*    />*/}
        {/*    <Menu.Item*/}
        {/*      style={styles.menuSelect}*/}
        {/*      onPress={() => {}}*/}
        {/*      title="Item 3"*/}
        {/*    />*/}
        {/*  </Menu>*/}
        {/*</View>*/}
        <ItemPicker
          itemData={dataHost}
          onFocus={() => setVisibleHost(true)}
          value={hostValue}
          setValue={setHostValue}
          visible={visibleHost}
          onDismiss={closeMenu}
          lable={'Select a Host'}
        />
        <ItemPicker
          itemData={dataPurpose}
          onFocus={() => setVisiblePurpos(true)}
          value={purposeValue}
          setValue={setPurposeValue}
          visible={visiblePurpose}
          onDismiss={closeMenu}
          lable={'Select Purpose'}
        />
        <View style={{alignItems: 'center'}}>
          <Button
            mode={'contained'}
            style={styles.button}
            onPress={submitHandler}>
            Next
          </Button>
        </View>

        {/*</View>*/}
        {/*<Picker*/}
        {/*  selectedValue={selectedLanguage}*/}
        {/*  onValueChange={(itemValue, itemIndex) =>*/}
        {/*    setSelectedLanguage(itemValue)*/}
        {/*  }>*/}
        {/*  <Picker.Item label="Java" value="java" />*/}
        {/*  <Picker.Item label="JavaScript" value="js" />*/}
        {/*</Picker>*/}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    width: 100,
    marginTop: 30,
  },
  // inputShow: {
  //   // marginTop: 30,
  //   width: 300,
  //   // margin: 20,
  // },
  // menuSelect: {
  //   width: 300,
  // },
  // menuContainer: {
  //   marginTop: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  formContainer: {
    flex: 1,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
});

export default CheckInDetails;
