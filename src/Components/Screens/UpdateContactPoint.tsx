import React, { Component } from 'react';
import { compose } from 'redux';
import { withFirebase, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { contactPointsCollectionName, discussionsSubCollectionName } from '../../consts';
import { contactPointType, discussionType } from 'let-me-know-ts-definitions';

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

class UpdateContactPoint extends Component<props> {

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
)(UpdateContactPoint);
