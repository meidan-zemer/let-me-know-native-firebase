import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { contactPointsCollectionName } from '../consts';
import { contactPointType } from 'let-me-know-ts-definitions';
import { StyleSheet, View, ScrollView} from 'react-native';
import {ListItem, Button, Text} from 'react-native-elements';

interface props {
  contactPoints: contactPointType[];
  firestore: any;
  firebase: any;
  classes: any;
  navigation: any;
}

class ContactPoints extends Component<props>{

  private navigateToAddContactPoint = () => {
    this.props.navigation.navigate('AddContactPoint');
  };

  private navigateToContactPoint = (cpId: string) => {
    this.props.navigation.navigate('ContactPoint', { cpId: cpId });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text h4 style={{width:'100%', textAlign:"center"}}> Contact Points</Text>
        <Button  title={"Add"} onPress={()=>this.navigateToAddContactPoint()} />
        <ScrollView>
          {this.props.contactPoints.map(cp => (
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});


const mapStateToProps = (state: any) => {
  return {
    contactPoints: state.firestore.ordered[contactPointsCollectionName]
      ? state.firestore.ordered[contactPointsCollectionName]
      : [],
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
  })
)(ContactPoints);
