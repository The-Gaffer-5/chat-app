import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GiftedChat, Bubble, renderBubble } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  }
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.navigation.state.params.color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({

})