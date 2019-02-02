import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { ReactReduxFirebaseProvider  } from 'react-redux-firebase';
import { createFirestoreInstance  } from 'redux-firestore';
import rootReducer from '../redux/rootReducer';
import firebase from 'react-native-firebase';

import Main from './Main';

// react-redux-firebase config
const rrfConfig = {
  //  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};



const initialState = {};
const store = createStore(rootReducer, initialState);

interface props {}

interface state {}


const rrfProps = {
     firebase,
     config: rrfConfig,
     dispatch: store.dispatch,
     createFirestoreInstance
};

export default class App extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <Main/>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}
