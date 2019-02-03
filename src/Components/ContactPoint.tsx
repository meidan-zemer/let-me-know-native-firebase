import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Button, Input, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase';
import { discussionsSubCollectionName, contactPointsCollectionName } from '../consts';
import { contactPointType, discussionType } from 'let-me-know-ts-definitions';
import Loading from './Loading';

interface props {
  navigation: any;
  cp: contactPointType;
  allDiscussions: discussionType[];
  uid: string;
  loaded: boolean;
  empty: boolean;
  firestore: any;
  firebase: any;
  classes: any;
}

class ContactPoint extends Component<props> {
  private navigateToDiscussion = (connectorId: string) => {
    this.props.navigation.navigate('ContactPointDiscussion', { cpId: this.props.cp.cpId, connectorId: connectorId });
  };

  renderDiscussion(dsc: discussionType, index: number) {
    return (
      <ListItem
        title={dsc.title}
        subtitle={'Created By ' + dsc.connectorAlias}
        key={dsc.title}
        onPress={() => this.navigateToDiscussion(dsc.connectorId)}
      />
    );
  }

  render() {
    if (!this.props.loaded) {
      return <Loading/>;
    } else {
      return (
        <View>
          <Text h3>{this.props.cp.name}</Text>
          <Text h4>{this.props.cp.description}</Text>
          {
            this.props.empty ?
              <Text>{'No Discussions'}</Text>
              :
              this.props.allDiscussions.map((d, i) => this.renderDiscussion(d, i))}
        </View>
      );
    }
  }
}

const mapStateToProps = (state: any, ownprops: props) => {
  const uid = ownprops.firebase.auth().currentUser.uid;
  const loaded = isLoaded(state.firestore.ordered.curCp) && isLoaded(state.firestore.ordered.allDiscussions);
  const empty = isEmpty(state.firestore.ordered.allDiscussions);
  let cp: contactPointType = isLoaded(state.firestore.ordered.curCp) ? state.firestore.ordered.curCp[0] : {},
    allDiscussions: discussionType[] = state.firestore.ordered.allDiscussions;

  return {
    cp: cp,
    uid: uid,
    allDiscussions,
    loaded,
    empty,
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
    const cpId = props.navigation.getParam('cpId');
    if (!uid || !cpId) return [];
    return [
      {
        collection: contactPointsCollectionName,
        doc: cpId,
        storeAs: 'curCp',
      },
      {
        collection: contactPointsCollectionName,
        doc: cpId,
        subcollections: [
          {
            collection: discussionsSubCollectionName,
          },
        ],
        storeAs: 'allDiscussions',
      },
    ];
  }),
)(ContactPoint);
