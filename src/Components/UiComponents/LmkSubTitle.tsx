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
        <Text numberOfLines={3} style={styles.text}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: '10%',
    width: '80%',
  },
  text: {
    fontSize: 25,
  },
});

export default LmkMainTitle;
