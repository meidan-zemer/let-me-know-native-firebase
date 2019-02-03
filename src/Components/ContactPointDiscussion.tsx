import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { discussionsSubCollectionName, contactPointsCollectionName, messagesSubCollectionName } from '../consts';
import { contactPointType, discussionType, messageType } from 'let-me-know-ts-definitions';
import Loading from "./Loading";


interface props {
  cp: contactPointType;
  uid: string;
  discussion: discussionType;
  messages: messageType[];
  connectorId:string;
  noMessages:boolean;
  navigation:any;
  isDiscussionOwner: boolean;
  loaded: boolean;
  firestore: any;
  firebase: any;
  classes: any;
}
interface state {
  newMessageContent: string;
}

class ContactPointDiscussion extends Component<props,state> {
  constructor(props: props) {
    super(props);
    this.state = { newMessageContent: '' };
  }
  renderTimeStamp(ts: any) {
    if (ts ) {
      return new Date(ts).toDateString();
    } else {
      return 'Now';
    }
  }
  getMessageSenderAlias(uid: string) {
    if (uid === this.props.uid) {
      return this.props.firebase.auth().currentUser.displayName;
    } else {
      if (uid === this.props.discussion.connectorId) {
        if (this.props.discussion.connectorAlias) {
          return this.props.discussion.connectorAlias;
        } else {
          return 'anonymous';
        }
      } else {
        if (this.props.cp.ownerAlias) {
          return this.props.cp.ownerAlias;
        } else {
          return 'anonymous';
        }
      }
    }
  }

  renderMessage(msg: messageType, index: number) {
    return (
      <ListItem key={index}
                title={this.getMessageSenderAlias(msg.from) + " "+this.renderTimeStamp(msg.createDate) + ":"}
                subtitle={msg.content}
      />
    );
  }

  render() {
    if(!this.props.loaded){
      return <Loading/>;
    } else {
      return (
        <View >
          <Text h1>{this.props.discussion.title}</Text>
          <Text h2>{"Created By " + this.props.discussion.connectorAlias}</Text>
          <View >
            {
              this.props.noMessages || this.props.messages.length == 0 ?
                <Text>{"No Messages"}</Text>
                :
                this.props.messages
                  .map((m, i) => this.renderMessage(m, i))
            }
          </View>
        </View>
      );
    }
  }
}


const mapStateToProps = (state: any, ownprops: props) => {
  const uid = ownprops.firebase.auth().currentUser.uid,
    isCpLoaded = isLoaded(state.firestore.ordered.curCp),
    isDiscussionLoaded = isLoaded(state.firestore.ordered.discussion),
    isMessagesLoaded = isLoaded(state.firestore.ordered.messages),
    connectorId = ownprops.navigation.getParam('connectorId'),
    loaded = isCpLoaded && isDiscussionLoaded && isMessagesLoaded,
    noMessages = isEmpty(state.firestore.ordered.messages);

  let cp = isCpLoaded ? state.firestore.ordered.curCp[0] : {},
    discussion = isDiscussionLoaded ? state.firestore.ordered.discussion[0] : {},
    messages = isDiscussionLoaded ? state.firestore.ordered.messages : [];

  return {
    cp: cp,
    uid: uid,
    isDiscussionOwner: connectorId == uid,
    discussion,
    messages,
    loaded,
    noMessages
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
    const uid = props.firebase.auth().currentUser.uid,
          connectorId = props.navigation.getParam('connectorId'),
          cpId = props.navigation.getParam('cpId');

    if (!uid) return [];
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
            doc: connectorId,
          },
        ],
        storeAs: 'discussion',
      },
      {
        collection: contactPointsCollectionName,
        doc: cpId,
        subcollections: [
          {
            collection: discussionsSubCollectionName,
            doc: connectorId,
            subcollections: [
              {
                collection: messagesSubCollectionName,
                orderBy: ['createDate', 'asc'],
              },
            ],
          },
        ],
        storeAs: 'messages',
      },
    ];
  })
)(ContactPointDiscussion);
