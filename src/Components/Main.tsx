import React, { Component } from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import SignIn from './Auth/SignIn';
import ContactPoints from './ContactPoints';
import ContactPoint from './ContactPoint';
import AddContactPoint from './AddContactPoint';
/*
 * Create navigation container
 */
const AppNavigator = createStackNavigator(
  {
    Home: { screen: ContactPoints },
    AddContactPoint: { screen: AddContactPoint },
    ContactPoint: { screen: ContactPoint },
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
  }

  componentDidMount(): void {
    this.props.firebase.auth().onAuthStateChanged((user: any) => {
      this.setState({user: user});
    });
  }

  render() {
    return (
      this.state.user ? <AppNavigatorComp/> : <SignIn/>
    );
  }
}

export default compose(
  withFirebase,
  connect(),
)(Main);
