import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//import {} from 'react-native-elements';

interface props {
  title: string;
}
class LmkMainTitle extends Component<props> {
  render() {
    return (
      <View style={styles.view}>
        <Text numberOfLines={1} style={styles.text}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  text: {
    fontSize: 40,
  },
});

export default LmkMainTitle;
