import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LmkCircleButton from './LmkCircleButton';

interface props {
  onClick: () => any;
}

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});

export default (props: props) => {
  return (
    <View style={{marginRight:'5%'}}>
      <LmkCircleButton onPress={() => props.onClick()}>
        <Icon iconStyle={styles.icon} name={'send'} type={'material'} />
      </LmkCircleButton>
    </View>
  );
};
