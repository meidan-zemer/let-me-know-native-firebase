import React, { Component } from 'react';
import { compose } from 'redux';
import { ScrollView, View, Text } from 'react-native';
import { withFirebase, isLoaded, firestoreConnect } from 'react-redux-firebase';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { contactPointsCollectionName, discussionsSubCollectionName } from '../../consts';
import { contactPointType, discussionType } from 'let-me-know-ts-definitions';
import LmkLoading from '../UiComponents/LmkLoading';
import LmkInput from '../UiComponents/LmkInput';
import LmkButton from '../UiComponents/LmkButton';
import LmkResetButton from '../UiComponents/LmkResetButton';

interface props {
  navigation: NavigationScreenProp<null, { cpId: string }>;
  cp: contactPointType;
  allDiscussions: discussionType[];
  uid: string;
  loaded: boolean;
  firestore: any;
  firebase: any;
  classes: any;
}
interface state {
  name: string;
  description: string;
  ownerAlias: string;
  err: string | null;
  loading: boolean;
  reseting: boolean;
}

class UpdateContactPoint extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      name: props.cp.name,
      description: props.cp.description,
      ownerAlias: props.cp.ownerAlias,
      err: null,
      loading: false,
      reseting: false,
    };
  }
  private reset() {
    this.setState({ reseting: true });
    this.setState(
      {
        name: this.props.cp.name,
        description: this.props.cp.description,
        ownerAlias: this.props.cp.ownerAlias,
      },
      () => this.setState({ reseting: false }),
    );
  }
  private update() {
    let cp = {
      name: this.state.name,
      description: this.state.description,
      ownerAlias: this.state.ownerAlias,
      modifiedDate: this.props.firestore.FieldValue.serverTimestamp(),
    };
    this.setState({ err: null, loading: true });
    this.props.firestore
      .collection(contactPointsCollectionName)
      .doc(this.props.cp.cpId)
      .update(cp)
      .then(() => {
        this.setState({ err: null, loading: false });
        this.props.navigation.goBack();
      })
      .catch((err: any) => this.setState({ err: err.message, loading: false }));
  }
  render() {
    if (this.state.loading) {
      return <LmkLoading label={'Updating ...'} />;
    }
    if (this.state.reseting) {
      return <LmkLoading label={'Reset ...'} />;
    } else {
      return (
        <ScrollView>
          <View style={{ marginLeft: '85%', paddingTop: '5%' }}>
            <LmkResetButton onClick={() => this.reset()} />
          </View>
          <LmkInput
            label={'Contact point name'}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <LmkInput
            label={'Contact point description'}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
          <LmkInput
            label={'Your alias'}
            value={this.state.ownerAlias}
            onChangeText={ownerAlias => this.setState({ ownerAlias })}
          />
          <LmkButton title={'Update'} onPress={() => this.update()} />
          <Text> {this.state.err}</Text>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state: any, ownprops: props) => {
  const uid = ownprops.firebase.auth().currentUser.uid;
  const loaded = isLoaded(state.firestore.ordered.curCp) && isLoaded(state.firestore.ordered.allDiscussions);
  let cp: contactPointType = isLoaded(state.firestore.ordered.curCp) ? state.firestore.ordered.curCp[0] : {},
    allDiscussions: discussionType[] = state.firestore.ordered.allDiscussions;

  return {
    cp: cp,
    uid: uid,
    allDiscussions,
    loaded,
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
  withNavigation,
)(UpdateContactPoint);
