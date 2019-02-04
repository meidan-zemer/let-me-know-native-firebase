import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from  'react-native-elements';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withFirebase} from 'react-redux-firebase';
import {Auth} from 'react-native-firebase/auth'

interface props {
  firebase:{
    auth:()=>Auth;
  }
}

class SideMenu extends Component<props>{

  render(){
    //
    const user =  this.props.firebase.auth().currentUser;
    if(user){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{`Hi ${user.displayName ? user.displayName : user.email}`}</Text>
          <Button title={"Sign out"} onPress={()=>this.props.firebase.auth().signOut()}/>
        </View>
      );
    }else{
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#2089dc',
    width:'100%',
    flex:1,
    flexDirection: 'column'
  },
  title:{
    color:'white',
    fontSize:20,
    textAlign:'center',
    width:'100%'
  }
});

export default compose(
  withFirebase,
  connect(),
)(SideMenu);
