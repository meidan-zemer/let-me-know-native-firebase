import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import LmkCircleButton from './LmkCircleButton';

interface props {
  onClick: () => any;
}

class LmkCreateQRButton extends Component<props> {
  render() {
    return (
      <LmkCircleButton onPress={() => this.props.onClick()}>
        <Icon iconStyle={styles.icon} name={'qrcode'} type={'font-awesome'} />
      </LmkCircleButton>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});
export default LmkCreateQRButton;
