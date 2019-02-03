import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { compose } from 'redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { contactPointsCollectionName } from '../consts';
import { contactPointType } from 'let-me-know-ts-definitions';

interface props {
  firebase: any;
  navigation: NavigationScreenProp<null, null>;
  firestore: any;
}

interface state {
  name: string;
  description: string;
  err: string | null;
}

class AddContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      err: null,
    };
  }

  addNewContactPoint() {
    const newCpDocRef = this.props.firestore.collection(contactPointsCollectionName).doc();
    const cp: contactPointType = {
      cpId: newCpDocRef.id,
      name: this.state.name,
      description: this.state.description,
      createdDate: this.props.firestore.FieldValue.serverTimestamp(),
      modifiedDate: this.props.firestore.FieldValue.serverTimestamp(),
      userId: this.props.firebase.auth().currentUser.uid,
      ownerAlias: '',
    };
    newCpDocRef
      .set(cp)
      .then(() => {
        this.setState({ err: null });
        this.props.navigation.goBack();
      })
      .catch((err: any) => {
        this.setState({ err: err });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Input style={styles.input} placeholder="contact point name" onChangeText={t => this.setState({ name: t })} />
        <Input
          style={styles.input}
          placeholder="contact point description"
          onChangeText={t => this.setState({ description: t })}
        />
        <Button style={styles.button} title={'Add'} onPress={() => this.addNewContactPoint()} />
        {this.state.err ? <Text>{this.state.err}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    textAlign: 'center',
  },
});

export default compose(
  withFirebase,
  withFirestore,
  withNavigation,
)(AddContactPoint);
