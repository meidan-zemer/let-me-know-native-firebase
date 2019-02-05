import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    textAlign: 'left',
  },
});

interface props {
  ph?: string;
  value: string;
  onChangeText: (t: string) => any;
  label?: string;
}

export default (props: props) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        value={props.value}
        label={props.label}
        inputStyle={styles.input}
        placeholder={props.ph}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};
