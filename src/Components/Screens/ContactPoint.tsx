import React, { Component } from 'react';
import { compose } from 'redux';
import { withFirebase, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase';
import { View, StyleSheet,Alert } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { discussionsSubCollectionName, contactPointsCollectionName } from '../../consts';
import { contactPointType, discussionType } from 'let-me-know-common';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import qrcode from 'yaqrcode';
import FileViewer from 'react-native-file-viewer';
import LmkLoading from '../UiComponents/LmkLoading';
import LmkMainTitle from '../UiComponents/LmkMainTitle';
import LmkSubTitle from '../UiComponents/LmkSubTitle';
import { getTimeDate } from '../../utils';
import LmkEditButton from '../UiComponents/LmkEditButton';
import LmkCreateQRButton from '../UiComponents/LmkCreateQRButton';

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
  private saveQR = () => {
    const name = this.props.cp.name;
    const desc = this.props.cp.description;
    const url =`https://let-me-know-36373.firebaseapp.com/ContactPoint/${this.props.cp.cpId}`;
    const data = qrcode(url);
    const html = `<html><body><h1>${name}</h1><h2>${desc}</h2><img src="${data}"/></body></html>`;
    const options = {
      html: html,
      fileName: 'LetMeKnowQR',
      directory: 'Documents',
    };
    RNHTMLtoPDF.convert(options).then((file:any)=>{
      FileViewer.open(file.filePath);
    });

  };
  private navigateToUpdate = () => {
    this.props.navigation.navigate('UpdateContactPoint', { cpId: this.props.cp.cpId });
  };
  renderDiscussion(dsc: discussionType, index: number) {
    return (
      <ListItem
        title={dsc.title}
        subtitle={'Created By ' + dsc.connectorAlias + ' on ' + getTimeDate(dsc.createdDate)}
        key={dsc.title}
        bottomDivider={true}
        onPress={() => this.navigateToDiscussion(dsc.connectorId)}
      />
    );
  }
  renderEmptyContent() {
    return (
      <View style={styles.emptyContentView}>
        <Text style={styles.emptyContent}>{'No Discussions'}</Text>
      </View>
    );
  }
  renderDiscussions() {
    return <View style={styles.content}>{this.props.allDiscussions.map((d, i) => this.renderDiscussion(d, i))}</View>;
  }
  render() {
    if (!this.props.loaded) {
      return <LmkLoading />;
    }
    if (!this.props.cp) {
      return <Text>{'No CP'}</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <LmkMainTitle title={this.props.cp.name} />
            <LmkSubTitle title={this.props.cp.description} />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={{marginBottom:'5%'}}><LmkEditButton onClick={() => this.navigateToUpdate()} /></View>
            <LmkCreateQRButton onClick={()=>this.saveQR()}/>
          </View>
          {this.props.empty ? this.renderEmptyContent() : this.renderDiscussions()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  header: {
    flex: 10,
  },
  buttonsContainer:{
    marginLeft: '85%',
    paddingTop: '5%',
    justifyContent:'space-between'
  },
  content: {
    flex: 100,
    marginTop: '5%',
  },
  editView: {},
  emptyContent: {
    fontSize: 30,
    textAlign: 'center',
  },
  emptyContentView: {
    flex: 100,
    justifyContent: 'center',
  },
});

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
