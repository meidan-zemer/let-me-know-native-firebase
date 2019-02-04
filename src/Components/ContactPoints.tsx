import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase';
import { contactPointsCollectionName } from '../consts';
import { contactPointType } from 'let-me-know-ts-definitions';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Button, Text } from 'react-native-elements';
import Loading from './Loading';

interface props {
  contactPoints: contactPointType[];
  firestore: any;
  firebase: any;
  classes: any;
  navigation: any;
  empty:boolean;
  loaded:boolean;
}

class ContactPoints extends Component<props> {

  private navigateToAddContactPoint = () => {
    this.props.navigation.navigate('AddContactPoint');
  };

  private navigateToContactPoint = (cpId: string) => {
    this.props.navigation.navigate('ContactPoint', { cpId: cpId });
  };

  render() {
    if(!this.props.loaded){
      return <Loading/>;
    } else {
      return (
        <View style={styles.container}>
          <Button title={'Add'} style={{borderRadius:100}} onPress={() => this.navigateToAddContactPoint()} />
          <ScrollView>
            {this.props.empty ?
              <Text>{"No Contact Points"}</Text>
              :
              this.props.contactPoints.map(cp => (
              <ListItem
                title={cp.name}
                key={cp.name}
                leftIcon={{ name: 'briefcase', type: 'material-community' }}
                onPress={() => this.navigateToContactPoint(cp.cpId)}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const mapStateToProps = (state: any) => {
  const contactPoints = state.firestore.ordered[contactPointsCollectionName],
        loaded = isLoaded(contactPoints),
        empty = isEmpty(contactPoints);
  return {
    contactPoints,
    empty,
    loaded
  };
};

const mapDispatchToProps = {};

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect((props: props) => {
    const uid = props.firebase.auth().currentUser.uid;
    if (!uid) return [];
    return [
      {
        collection: contactPointsCollectionName,
        where: [['userId', '==', uid]],
      },
    ];
  }),
)(ContactPoints);
