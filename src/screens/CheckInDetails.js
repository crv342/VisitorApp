import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import ItemPicker from '../components/ItemPicker';

import {
  Divider,
  Menu,
  Button,
  TextInput,
  Text,
  Subheading,
  HelperText,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {checkin} from '../store/actions/visitor';
import {err} from 'react-native-svg/lib/typescript/xml';
import Colors from '../constants/Colors';

let vData;

const CheckInDetails = props => {
  const dispatch = useDispatch();
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState();
  const [visitorAddress, setVisitorAddress] = useState();
  const [visitorGender, setVisitorGender] = useState();
  const [visitorDOB, setVisitorDOB] = useState();
  const [hostValue, setHostValue] = useState();
  const [purposeValue, setPurposeValue] = useState();
  const [visibleHost, setVisibleHost] = useState(false);
  const [visiblePurpose, setVisiblePurpose] = useState(false);
  const purposeData = useSelector(state => state.host.purposes);
  const [error, setError] = useState(false);

  // Changes XML to JSON
  // function xmlToJson(xml) {
  //   // Create the return object
  //   var obj = {};
  //
  //   if (xml.nodeType == 1) {
  //     // element
  //     // do attributes
  //     if (xml.attributes.length > 0) {
  //       obj['@attributes'] = {};
  //       for (var j = 0; j < xml.attributes.length; j++) {
  //         var attribute = xml.attributes.item(j);
  //         obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
  //       }
  //     }
  //   } else if (xml.nodeType == 3) {
  //     // text
  //     obj = xml.nodeValue;
  //   }
  //
  //   // do children
  //   if (xml.hasChildNodes()) {
  //     for (var i = 0; i < xml.childNodes.length; i++) {
  //       var item = xml.childNodes.item(i);
  //       var nodeName = item.nodeName;
  //       if (typeof obj[nodeName] === 'undefined') {
  //         obj[nodeName] = xmlToJson(item);
  //       } else {
  //         if (typeof obj[nodeName].push === 'undefined') {
  //           var old = obj[nodeName];
  //           obj[nodeName] = [];
  //           obj[nodeName].push(old);
  //         }
  //         obj[nodeName].push(xmlToJson(item));
  //       }
  //     }
  //   }
  //   return obj;
  // }
  if (props.route.params) {
    vData = props.route.params.data;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (typeof vData === 'string' && vData.startsWith('<')) {
        if (vData.startsWith('<?xml')) {
          vData = vData.slice(63, vData.length - 2).trim();
        } else if (vData.startsWith('<')) {
          vData = vData.slice(5, vData.indexOf('s="') - 1).trim();
        }
        console.log('pre' + vData);
        vData = vData.replace(/[,]/g, '?');
        vData = vData.replace(/[=]/g, '":');
        vData = '{"' + vData.replace(/" /g, ',"') + '}';
        vData = vData.replace(/[,]/g, '",');
        vData = vData.replace(/[?]/g, ',');
        console.log('before parse' + vData);
        vData = JSON.parse(vData);
        setVisitorName('name' in vData ? vData.name : vData.n);
        setVisitorAddress(
          'a' in vData
            ? vData.a
            : vData.house +
                ', ' +
                vData.street +
                ', ' +
                vData.lm +
                ', ' +
                vData.vtc +
                ', ' +
                vData.po +
                ', ' +
                vData.dist +
                ', ' +
                vData.subdist +
                ', ' +
                vData.state +
                ', ' +
                vData.pc,
        );
        setVisitorGender('gender' in vData ? vData.gender : vData.g);
        setVisitorDOB('dob' in vData ? vData.dob : vData.d);
      }
    }, []);
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

  const submitHandler = async () => {
    if (
      visitorName === '' ||
      hostValue === undefined ||
      purposeValue === undefined ||
      visitorPhone === undefined
    ) {
      setError('required field is empty!');
      return;
    }
    if (visitorPhone.length < 10) {
      setError('mobile number should be 10 numbers long');
      return;
    }
    dispatch(
      checkin(
        visitorName,
        visitorPhone,
        visitorAddress,
        visitorGender,
        visitorDOB,
        new Date(),
        '',
        hostValue,
        purposeValue,
      ),
    );
    props.navigation.navigate('CheckInSuccess', {name: visitorName});
  };

  const closeMenu = () => {
    setVisibleHost(false);
    setVisiblePurpose(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/*<ScrollView contentContainerStyle={styles.screen}>*/}
      {/*<View style={{height: '20%'}} />*/}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputField}
          label={'Name*'}
          value={visitorName}
          onChangeText={t => {
            setVisitorName(t);
          }}
          onFocus={() => setError(false)}
        />
        {visitorAddress && (
          <TextInput
            style={{...styles.inputField}}
            label={'Address'}
            value={visitorAddress}
            editable={false}
            disabled={true}
            numberOfLines={3}
            multiline={true}
          />
          // <View style={styles.otherData}>
          //   <Subheading>Address</Subheading>
          //   <Text>{visitorAddress}</Text>
          // </View>
        )}

        <TextInput
          textContentType={'telephoneNumber'}
          keyboardType={'number-pad'}
          style={{...styles.inputField}}
          label={'Mobile*'}
          value={visitorPhone}
          onChangeText={t => {
            setVisitorPhone(t);
          }}
          left={<TextInput.Affix text={'+91 '} />}
        />
        {/*<TextInput*/}
        {/*  style={styles.inputField}*/}
        {/*  label={'Address'}*/}
        {/*  value={visitorAddress}*/}
        {/*  onChangeText={t => {*/}
        {/*    setVisitorAddress(t);*/}
        {/*  }}*/}
        {/*/>*/}
        <ItemPicker
          itemData={dataHost}
          onFocus={() => {
            setError(false);
            setVisibleHost(true);
          }}
          value={hostValue}
          setValue={setHostValue}
          visible={visibleHost}
          onDismiss={closeMenu}
          lable={'Select a Host*'}
        />
        <ItemPicker
          itemData={purposeData}
          onFocus={() => {
            setError(false);
            setVisiblePurpose(true);
          }}
          value={purposeValue}
          setValue={setPurposeValue}
          visible={visiblePurpose}
          onDismiss={closeMenu}
          lable={'Select Purpose*'}
        />
        {/*{error && (*/}

        {/*)}*/}
        <View style={{alignItems: 'center', marginTop: 30}}>
          <HelperText
            style={styles.errorText}
            type="error"
            visible={error ? true : false}>
            {error}
          </HelperText>
          <Button
            mode={'contained'}
            style={styles.button}
            onPress={submitHandler}>
            Next
          </Button>
        </View>
      </View>
      {/*</ScrollView>*/}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: 100,
  },
  inputField: {
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  otherData: {
    marginTop: 10,
    width: 300,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    // borderRadius: 10,
    borderBottomEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  formContainer: {
    flex: 1,
    // height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '90%',
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
});

export default CheckInDetails;
