import React,{Component} from 'react';
import {View} from 'react-native';
import {Text, Header as H, Button} from  'react-native-elements';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withFirebase} from 'react-redux-firebase';
import {Auth} from 'react-native-firebase/auth'

interface props {
  firebase:{
    auth:()=>Auth;
  }
}

class Header extends Component<props>{

  render(){
    const user =  this.props.firebase.auth().currentUser;
    if(user){
      return (
        <H
          placement={"center"}
          leftComponent={{text:`Hi ${user.displayName ? user.displayName : user.email}`}}
          rightComponent={<Button title={"Sign out"} onPress={()=>this.props.firebase.auth().signOut()}/>}
        />
      );
    }else{
      return null;
    }
  }
}

export default compose(
  withFirebase,
  connect(),
)(Header);
