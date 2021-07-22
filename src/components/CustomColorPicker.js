import React from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// export type ColorPickerProps = {
//   colors?: string[];
//   onSelect?: (item: string) => void;
//   selectedColor?: string;
// };

const CustomColorPicker = ({
  colors,
  onSelect,
  selectedColor,
}) => {
  return (
    <FlatList
      data={colors}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: item }]}
          onPress={() => {
            onSelect(item);
          }}
        >
          {selectedColor === item && (
            <Icon name="check" style={{ color: "#fff", fontSize: 24 }} />
          )}
          {'#ffffff' === item && (
            <Icon name="colorize" style={{ color: "#000", fontSize: 24 }} />
          )}
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => "key" + index}
      horizontal={true}
      keyboardShouldPersistTaps="always"
      style={{ maxHeight: 75 }}
    />
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomColorPicker;
