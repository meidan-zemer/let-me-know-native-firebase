import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface props {
  onPress: () => any;
}

class LmkCircleButton extends Component<props> {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.onPress()}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2089dc',
    borderRadius: 1000,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LmkCircleButton;
