import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface props {
  title: string;
  onPress: () => any;
}
class LmkButton extends Component<props> {
  render() {
    return (
      <View style={styles.buttonView}>
        <Button
          titleStyle={{ fontSize: 20 }}
          buttonStyle={styles.button}
          title={this.props.title}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 15,
    alignSelf: 'center',
    width: '95%',
  },
  button: {
    //textAlign: 'center',
    borderRadius: 50,
  },
});

export default LmkButton;
