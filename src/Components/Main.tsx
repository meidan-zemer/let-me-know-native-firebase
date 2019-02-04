import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import ReactNativeSideMenu from 'react-native-side-menu';
import SignIn from './SignIn';
import ContactPoints from './ContactPoints';
import ContactPoint from './ContactPoint';
import AddContactPoint from './AddContactPoint';
import ContactPointDiscussion from './ContactPointDiscussion';
import Header from './Header';
import SideMenu from './SideMenu'
/*
 * Create navigation container
 */
const AppNavigator = createStackNavigator(
  {
    Home: { screen: ContactPoints,navigationOptions:{headerTitle:<Header title={"Contact Points"}/>}},
    AddContactPoint: { screen: AddContactPoint,navigationOptions:{headerTitle:<Header title={"Add Contact Points"}/> }},
    ContactPoint: { screen: ContactPoint,navigationOptions:{headerTitle:<Header title={"Contact Point"}/> }},
    ContactPointDiscussion: { screen: ContactPointDiscussion,navigationOptions:{headerTitle:<Header title={"Contact Point Discussion"}/> }},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: () => ({
      headerTitle:<Header title={"Let Me Know"}/>,
      headerStyle:{backgroundColor: '#2089dc'}
    })
  },
);


/*
  static navigationOptions = () => ({
    title: `Home`,
    headerBackTitle: null
  });

* */
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
      this.setState({ user: user });
    });
  }

  render() {
    return this.state.user ?
      <ReactNativeSideMenu menu={<SideMenu/>}>
        <AppNavigatorComp />
      </ReactNativeSideMenu>
      :
      <SignIn />;
  }
}

export default compose(
  withFirebase,
  connect(),
)(Main);
