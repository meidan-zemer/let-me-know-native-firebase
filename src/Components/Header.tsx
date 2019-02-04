import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from  'react-native-elements';


interface props {
  title:string;
}

class Header extends Component<props>{

  render(){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#2089dc',
    width:'100%',
    flex:1,
    flexDirection: 'row'
  },
  title:{
    color:'white',
    fontSize:30,
    textAlign:'center',
    width:'100%'
  }
});

export default Header;
