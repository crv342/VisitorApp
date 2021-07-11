import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ItemPicker from '../components/ItemPicker';
import {Picker} from '@react-native-picker/picker';

import {Divider, Menu, Button, TextInput, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {checkin} from '../store/actions/visitor';

let vData;

const CheckInDetails = props => {
  const dispatch = useDispatch();
  const [visitorName, setVisitorName] = useState('');
  const [hostValue, setHostValue] = useState();
  const [purposeValue, setPurposeValue] = useState();
  const [visibleHost, setVisibleHost] = useState(false);
  const [visiblePurpose, setVisiblePurpose] = useState(false);

  // Changes XML to JSON
  function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === 'undefined') {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }
  if (props.route.params) {
    vData = props.route.params.data;
    useEffect(() => {
      if (typeof vData === 'string' && vData.startsWith('<')) {
        if (vData.startsWith('<?xml')) {
          vData = vData.slice(63, vData.length - 2).trim();
        } else if (vData.startsWith('<')) {
          vData = vData.slice(5, vData.indexOf('a="') - 1).trim();
        }
        console.log('pre' + vData);
        // vData = vData.replace(/ /g, '?');
        vData = vData.replace(/[=]/g, '":');
        vData = '{"' + vData.replace(/" /g, ',"') + '}';
        vData = vData.replace(/[,]/g, '",');
        console.log('before parse' + vData);
        vData = JSON.parse(vData);
        setVisitorName('name' in vData ? vData.name : vData.n);
      }
    }, [vData]);
  }
  // vData = props.route.params.data;
  // useEffect(() => {
  //   if (typeof vData === 'string' && vData.startsWith('<')) {
  //     if (vData.startsWith('<?xml')) {
  //       vData = vData.slice(63, vData.length - 2).trim();
  //     } else if (vData.startsWith('<')) {
  //       vData = vData.slice(5, vData.indexOf('a="') - 1).trim();
  //     }
  //     console.log('pre' + vData);
  //     // vData = vData.replace(/ /g, '?');
  //     vData = vData.replace(/[=]/g, '":');
  //     vData = '{"' + vData.replace(/" /g, ',"') + '}';
  //     vData = vData.replace(/[,]/g, '",');
  //     console.log('before parse' + vData);
  //     vData = JSON.parse(vData);
  //     setVisitorName('name' in vData ? vData.name : vData.n);
  //   }
  // }, []);

  // var jsonText = JSON.stringify(xmlToJson(vData));
  // console.log(jsonText);

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

  const submitHandler = async () => {
    dispatch(checkin(visitorName, new Date(), '', hostValue, purposeValue));
    props.navigation.navigate('CheckInSuccess', {name: visitorName});
  };

  // const openMenu = () => setVisible(true);
  //
  const closeMenu = () => {
    setVisibleHost(false);
    setVisiblePurpose(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={{height: '25%'}} />
        <TextInput
          style={styles.inputField}
          label={'name'}
          value={visitorName}
          onChangeText={t => {
            setVisitorName(t);
          }}
        />
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
          onFocus={() => setVisiblePurpose(true)}
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
  inputField: {
    width: 300,
    alignSelf: 'center',
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
