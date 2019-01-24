import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { View, Text ,Button} from 'react-native';
import ContactPoints from "./ContactPoints";

interface props {
  firebase: {
    login: (arg: any) => any;
    logout: () => any;
    auth: () => any;
  };
}

interface state {
  user: any;
}

class Main extends Component<props,state>{
  constructor(props: props) {
    super(props);
    this.state = {
      user: null,
    };

    props.firebase.auth().onAuthStateChanged((user: any) => {
     this.setState({ user: user });
    });
  }

  googleSignIn() {
    this.props.firebase.login({ provider: 'google', type: 'popup' }).then((user: any) => this.setState({ user: user }));
  }
  logout() {
    this.props.firebase.logout().then(() => this.setState({ user: null}));
  }

  render(){
    return (
      <View>
        {
          this.state.user ?
            (<View>
              <Button title={"Sign In"} onPress={()=>this.googleSignIn()}/>
            </View>)
            :
            (<ContactPoints/>)
        }
      </View>
    );
  }
}

export default compose(
  withFirebase,
  connect(),
)(Main);
