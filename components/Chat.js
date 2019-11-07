import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.navigation.state.params.color }}>
        <Text>Hello Screen2!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
})