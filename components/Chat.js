import React, { Component } from 'react';
import { View, StyleSheet, Platform, AsyncStorage, NetInfo } from 'react-native';
import MapView from 'react-native-maps';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CustomActions from './CustomActions';


const firebase = require('firebase');
require('firebase/firestore');

/**
 * Class representing the application chat screen
 * @extends react.Component
 */

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.name}'s Convo`,
    };
  }

  constructor() {
    super();

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDJekiF-wNeEPUX_libTNPXlhRFwm3f0Jg',
        authDomain: 'chat-app2-4fe17.firebaseapp.com',
        databaseURL: 'https://chat-app2-4fe17.firebaseio.com',
        projectId: 'chat-app2-4fe17',
        storageBucket: 'chat-app2-4fe17.appspot.com',
        messagingSenderId: '735997413474',
        appId: '1:735997413474:web:0b641a69439dbc82e9e93b',
      });
    }

    this.referenceChatUser = null;
    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      image: null,
      location: null,
      uri: null,
      isConnected: false,
      uid: '',
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || '',
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  }

  componentDidMount() {
    this.getMessages();

    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        });

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: this.props.navigation.state.params.name,
              avatar: '',
            },
            loggedInText: 'Welcome!',
          });
          this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
        });

        this.referenceChatUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);
      } else {
        console.log('offline');
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  /**
   * Add messages to the state when a message is sent
   * @async
   * @function
   * @param {object} message latest message object
   */

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      },
    );
  }

  /**
   * Retrieve messages from async storage
   * @async
   * @function
   */

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Add messages to the database
   * @async
   * @function
   * @param {object} message Object containing message to be stored
   */

  addMessage() {
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.messages[0].user,
      uid: this.state.uid,
      image: this.state.messages[0].image || '',
      location: this.state.messages[0].location || null,
    });
  }

  /**
   * Save messages to local storage
   * @async
   * @function
   * @param {object} messgaes Object containing messages
   */

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }


  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  /**
 * Customise button colour
 */

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  }

  /**
   * Disable input when offline
   */

  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  /**
   * Render button to display custom actions
   */

  renderCustomActions = (props) => { return <CustomActions {...props} />; }

  /**
   * Render a map view when sending location
   */

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.navigation.state.params.color }}>

        {this.state.uri && <Image source={{ uri: this.state.uri }} style={styles.image} />}

        <GiftedChat
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});