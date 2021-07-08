import React from 'react';
import {Menu, TextInput} from 'react-native-paper';
import {Keyboard, StyleSheet, View} from 'react-native';

const ItemPicker = ({
  visible,
  onDismiss,
  value,
  setValue,
  lable,
  onFocus,
  itemData,
}) => {
  return (
    <View style={styles.menuContainer}>
      <Menu
        style={styles.menuSelect}
        visible={visible}
        onDismiss={onDismiss}
        anchor={
          <TextInput
            style={styles.inputShow}
            // keyboardAppearance={false}
            showSoftInputOnFocus={false}
            label={lable}
            value={value}
            onFocus={onFocus}
            keyboardType={null}
          />
          // <Button mode={'outlined'} onPress={openMenu}>
          //   Select Host
          // </Button>
        }>
        {itemData.map(item => (
          <Menu.Item
            key={item._id}
            style={styles.menuSelect}
            onPress={() => {
              Keyboard.dismiss();
              onDismiss();
              setValue(item.name);
            }}
            title={item.name}
          />
        ))}

        {/*<Menu.Item*/}
        {/*  style={styles.menuSelect}*/}
        {/*  onPress={() => {}}*/}
        {/*  title="Item 2"*/}
        {/*/>*/}
        {/*<Menu.Item*/}
        {/*  style={styles.menuSelect}*/}
        {/*  onPress={() => {}}*/}
        {/*  title="Item 3"*/}
        {/*/>*/}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  inputShow: {
    // marginTop: 30,
    width: 300,
    // margin: 20,
  },
  menuSelect: {
    width: 300,
  },
  menuContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemPicker;
