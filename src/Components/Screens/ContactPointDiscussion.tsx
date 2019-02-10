import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Text, Input } from 'react-native-elements';
import { contactPointType, discussionType, messageType,discussionsSubCollectionName, contactPointsCollectionName, messagesSubCollectionName, getTimeDate  } from 'let-me-know-common';
import LmkLoading from '../UiComponents/LmkLoading';
import LmkMainTitle from '../UiComponents/LmkMainTitle';
import LmkSubTitle from '../UiComponents/LmkSubTitle';
import LmkSendButton from '../UiComponents/LmkSendButton';

interface props {
  cp: contactPointType;
  uid: string;
  discussion: discussionType;
  messages: messageType[];
  connectorId: string;
  noMessages: boolean;
  navigation: any;
  isDiscussionOwner: boolean;
  loaded: boolean;
  firestore: any;
  firebase: any;
  classes: any;
}
interface state {
  newMessageContent: string;
}

class ContactPointDiscussion extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { newMessageContent: '' };
  }
  renderTimeStamp(ts: any) {
    if (ts) {
      return getTimeDate(ts);
    } else {
      return 'Now';
    }
  }
  getMessageSenderAlias(uid: string) {
    if (uid === this.props.uid) {
      const user = this.props.firebase.auth().currentUser;
      return user.displayName ? user.displayName : user.email;
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
      <ListItem
        bottomDivider={true}
        key={index}
        title={this.getMessageSenderAlias(msg.from) + ' ' + this.renderTimeStamp(msg.createDate) + ':'}
        subtitle={msg.content}
      />
    );
  }
  sendMessage() {
    const msg: messageType = {
      createDate: this.props.firestore.FieldValue.serverTimestamp(),
      content: this.state.newMessageContent,
      from: this.props.uid,
    };

    this.props.firestore
      .add(
        `${contactPointsCollectionName}/${this.props.cp.cpId}/${discussionsSubCollectionName}/${
          this.props.discussion.connectorId
        }/${messagesSubCollectionName}`,
        msg,
      )
      .then(() => {
        this.setState({ newMessageContent: '' });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  renderNewMessage() {
    return (
      <View style={{ paddingBottom: '3%',flex:1, flexDirection:'row' }}>
        <View style={{flex:8}}>
          <Input
            inputStyle={{ textAlign: 'left'}}
            placeholder={'Enter you message ...'}
            onChangeText={t => this.setState({ newMessageContent: t })}
            value={this.state.newMessageContent}
          />
        </View>
        <View style={{flex:1, marginRight:'5%'}}>
          <LmkSendButton
            onClick={() => this.sendMessage()}
          />
        </View>
      </View>
    );
  }
  render() {
    if (!this.props.loaded) {
      return <LmkLoading />;
    } else {
      return (
        <ScrollView>
          <LmkMainTitle title={this.props.discussion.title} />
          <LmkSubTitle
            title={
              'Created By ' +
              this.props.discussion.connectorAlias +
              ' on ' +
              getTimeDate(this.props.discussion.createdDate)
            }
          />
          {this.props.noMessages || this.props.messages.length == 0 ? (
            <Text>{'No Messages'}</Text>
          ) : (
            this.props.messages.map((m, i) => this.renderMessage(m, i))
          )}
          {this.renderNewMessage()}
        </ScrollView>
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
    noMessages,
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
  }),
)(ContactPointDiscussion);
