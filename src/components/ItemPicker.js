import React from 'react';
import {Menu, TextInput, Divider} from 'react-native-paper';
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
  const len = itemData.length;
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
        }>
        {itemData.map((item, i) => (
          <View key={item.name}>
            <Menu.Item
              style={styles.menuSelect}
              onPress={() => {
                Keyboard.dismiss();
                onDismiss();
                setValue(item.name);
              }}
              title={item.name}
            />
            {len !== i + 1 && <Divider />}
          </View>
        ))}
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemPicker;
