import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import LmkCircleButton from './LmkCircleButton';

interface props {
  onClick: () => any;
}

class LmkAddButton extends Component<props> {
  render() {
    return (
      <LmkCircleButton onPress={() => this.props.onClick()}>
        <Icon iconStyle={styles.icon} name={'add'} type={'material'} />
      </LmkCircleButton>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});
export default LmkAddButton;
