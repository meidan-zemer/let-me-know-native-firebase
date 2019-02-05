import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

interface props {
  label?:string
}
export default class LmkLoading extends React.Component<props> {
  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.loadingMessage}>
          {this.props.label ? this.props.label :'Almost there ...'}
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    marginBottom: 100,
  },
});
