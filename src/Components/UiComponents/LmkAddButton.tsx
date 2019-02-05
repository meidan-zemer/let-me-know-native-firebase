import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
    <LmkCircleButton onPress={() => props.onClick()}>
      <Icon iconStyle={styles.icon} name={'add'} type={'material'} />
    </LmkCircleButton>
  );
};
