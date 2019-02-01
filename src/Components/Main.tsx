import React, { Component } from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { View, Text, Button } from 'react-native';
import SignIn from './Auth/SignIn';
import Header from './Header';
import ContactPoints from './ContactPoints';

/*
 * Create navigation container
 */
const AppNavigator = createStackNavigator(
  {
    Home: { screen: ContactPoints }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppNavigatorComp = createAppContainer(AppNavigator);

interface props {
  firebase: {
    auth: () => any;
  };
}

interface state {
  user: any;
}

class Main extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      user: null
    };

    props.firebase.auth().onAuthStateChanged((user: any) => {
      this.setState({ user: user });
    });
  }

  render() {
    return <View>
      {this.state.user ? <Header/> : null}
      {this.state.user ? <AppNavigatorComp/> : <SignIn/>}
    </View>}
}

export default compose(
  withFirebase,
  connect(),
)(Main);
