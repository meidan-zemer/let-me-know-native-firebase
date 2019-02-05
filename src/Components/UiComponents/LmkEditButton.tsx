import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import LmkCircleButton from './LmkCircleButton';

interface props {
  onClick: () => any;
}

class LmkEditButton extends Component<props> {
  render() {
    return (
      <LmkCircleButton onPress={() => this.props.onClick()}>
        <Icon iconStyle={styles.icon} name={'edit'} type={'material'} />
      </LmkCircleButton>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});
export default LmkEditButton;
