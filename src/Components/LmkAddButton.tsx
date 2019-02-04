import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

interface props {
  onClick:()=>any
}
class LmkAddButton extends Component<props> {
    render(){
      return (
        <TouchableOpacity style={styles.container} onPress={()=>this.props.onClick()}>
          <Icon iconStyle={styles.icon} name={'add'} type={'material'}/>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#2089dc',
    borderRadius: 1000,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems:'center'

  },
  icon:{
    color:'white'
  }
});
export default LmkAddButton;
