import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { compose } from 'redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Picker from 'react-native-picker-select';
import { contactPointsCollectionName } from '../../consts';
import { contactPointType } from 'let-me-know-ts-definitions';
import LmkButton from '../UiComponents/LmkButton';
import LmkInput from '../UiComponents/LmkInput'
import LmkSubTitle from '../UiComponents/LmkSubTitle'

interface props {
  firebase: any;
  navigation: NavigationScreenProp<null, null>;
  firestore: any;
}
interface state {
  type?: number;
  name: string;
  description: string;
  ownerAlias: string;
  err: string | null;
}

class AddContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ownerAlias: '',
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
      ownerAlias: this.state.ownerAlias,
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
  renderInput(ph: string, value:string, onChangeText: (t: string) => any) {
    return (
      <LmkInput onChangeText={onChangeText} ph={ph} value={value}/>
    );
  }
  renderNameInput(ph: string) {
    return this.renderInput(ph, this.state.name,name => this.setState({ name }));
  }
  renderDescriptionInput(ph: string) {
    return this.renderInput(ph, this.state.description,t => this.setState({ description: t }));
  }
  renderAliasInput() {
    return this.renderInput('What will be your nick name?',this.state.ownerAlias, t => this.setState({ ownerAlias: t }));
  }
  renderCustom() {
    return (
      <View>
        {this.renderNameInput('contact point name')}
        {this.renderDescriptionInput('contact point description')}
        {this.renderAliasInput()}
      </View>
    );
  }
  renderSale() {
    return (
      <View>
        {this.renderNameInput('What are you selling?')}
        {this.renderDescriptionInput('Add some comments about it')}
        {this.renderAliasInput()}
      </View>
    );
  }
  renderLocate() {
    return (
      <View>
        {this.renderNameInput('What is the item (suit case, wallet etc.)')}
        {this.renderDescriptionInput('What people will see when they find it')}
        {this.renderAliasInput()}
      </View>
    );
  }
  renderAddButton() {
    return <LmkButton title={'Create Contact Point'} onPress={() => this.addNewContactPoint()} />;
  }
  render() {
    let content = null;
    switch (this.state.type) {
      case 0: {
        content = this.renderSale();
        break;
      }
      case 1: {
        content = this.renderLocate();
        break;
      }
      case 2: {
        content = this.renderCustom();
        break;
      }
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <LmkSubTitle title={'What would you like to add?'}/>
          <Picker
            items={[
              { label: 'Contact point for sale', value: 0 },
              { label: 'Contact point for tracking if lost', value: 1 },
              { label: 'Let me customize my contact point', value: 2 },
            ]}
            onValueChange={value => this.setState({ type: value })}
            value={this.state.type}
          />
          {content}
          {this.state.type != null ? this.renderAddButton() : null}
          {this.state.err ? <Text>{this.state.err}</Text> : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 25,
  }
});

export default compose(
  withFirebase,
  withFirestore,
  withNavigation,
)(AddContactPoint);
