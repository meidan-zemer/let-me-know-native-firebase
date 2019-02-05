import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Input, Text } from 'react-native-elements';
import { Auth } from 'react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { View, ScrollView } from 'react-native';
import LmkLoading from '../UiComponents/LmkLoading';

interface props {
  firebase: Auth;
}

interface state {
  signIn: {
    email: string;
    password: string;
    err: string | null;
  };
  signUp: {
    email: string;
    password: string;
    err: string | null;
  };
  isSigninInProgress: boolean;
}

class SignIn extends Component<props, state> {
  constructor(props: props) {
    super(props);
    GoogleSignin.configure();
    this.state = {
      signIn: {
        password: '',
        email: '',
        err: null,
      },
      signUp: {
        password: '',
        email: '',
        err: null,
      },
      isSigninInProgress: false,
    };
  }
  signIn(email: string, password: string) {
    this.setState({ ...this.state, signIn: { ...this.state.signIn, err: null }, isSigninInProgress: true });
    this.props.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.setState({ isSigninInProgress: false }))
      .catch((err: any) => {
        this.setState({ ...this.state, signIn: { ...this.state.signIn, err: err.message }, isSigninInProgress: false });
      });
  }
  signUp(email: string, password: string) {
    this.setState({ ...this.state, signUp: { ...this.state.signUp, err: null }, isSigninInProgress: true });
    this.props.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        this.setState({
          ...this.state,
          signIn: { ...this.state.signIn, email: email, password: password },
          isSigninInProgress: false,
        }),
      )
      .catch((err: any) => {
        this.setState({ ...this.state, signUp: { ...this.state.signUp, err: err.message }, isSigninInProgress: false });
      });
  }
  googleSignIn() {
    this.setState({ isSigninInProgress: true });
    GoogleSignin.hasPlayServices()
      .then(() => GoogleSignin.signIn())
      .then((data: any) => {
        const credential = this.props.firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return this.props.firebase.auth().signInWithCredential(credential);
      })
      .then(() => this.setState({ isSigninInProgress: false }))
      .catch(err => {
        this.setState({ ...this.state, signUp: { ...this.state.signUp, err: err.message, isSigninInProgress: false } });
      });
  }

  render() {
    if (this.state.isSigninInProgress) {
      return <LmkLoading />;
    } else
      return (
        <ScrollView>
          <View>
            <Text h3>Sign In</Text>
            <Input
              placeholder="Enter your Email"
              leftIcon={{ type: 'material', name: 'email' }}
              onChangeText={text => this.setState({ ...this.state, signIn: { ...this.state.signIn, email: text } })}
            />
            <Input
              secureTextEntry={true}
              placeholder="Enter your password"
              leftIcon={{ type: 'material', name: 'lock' }}
              onChangeText={text => this.setState({ ...this.state, signIn: { ...this.state.signIn, password: text } })}
            />
            <Button
              title={'Sign In'}
              onPress={() => this.signIn(this.state.signIn.email, this.state.signIn.password)}
            />
            {this.state.signIn.err ? <Text h4>{this.state.signIn.err}</Text> : null}
          </View>
          <View>
            <Text h3>Sign Up</Text>
            <Input
              placeholder="Enter your Email"
              leftIcon={{ type: 'material', name: 'email' }}
              onChangeText={text => this.setState({ ...this.state, signUp: { ...this.state.signUp, email: text } })}
            />
            <Input
              secureTextEntry={true}
              placeholder="Enter your password"
              leftIcon={{ type: 'material', name: 'lock' }}
              onChangeText={text => this.setState({ ...this.state, signUp: { ...this.state.signUp, password: text } })}
            />
            <Button
              title={'Sign Up'}
              onPress={() => this.signUp(this.state.signUp.email, this.state.signUp.password)}
            />
            {this.state.signUp.err ? <Text h4>{this.state.signUp.err}</Text> : null}
            <Text h4> Or</Text>
            <GoogleSigninButton
              style={{ width: '100%', height: 48 }}
              onPress={() => this.googleSignIn()}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
            />
          </View>
        </ScrollView>
      );
  }
}

export default compose(
  withFirebase,
  connect(),
)(SignIn);
