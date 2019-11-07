import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    }
  }
  render() {
    return (
      <ImageBackground source={require('../assets/bkgd.png')} style={{ width: '100%', height: '100%', alignItems: 'center' }}>
        <Text style={styles.title}>CHAT UP</Text>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.textBox}
            placeholder="Your Name"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
          <Text>Choose Background Color:</Text>
          <View style={styles.colorChoice}>
            <TouchableOpacity style={[styles.colorBtn, styles.color1]} onPress={() => this.setState({ color: '#090C08' })} />
            <TouchableOpacity style={[styles.colorBtn, styles.color2]} onPress={() => this.setState({ color: '#474056' })} />
            <TouchableOpacity style={[styles.colorBtn, styles.color3]} onPress={() => this.setState({ color: '#8A95A5' })} />
            <TouchableOpacity style={[styles.colorBtn, styles.color4]} onPress={() => this.setState({ color: '#B9C6AE' })} />
          </View>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
          >
            <Text style={styles.btnText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#757083',
    marginBottom: 20
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#fff',
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 100,
    marginRight: 100,
    letterSpacing: 2
  },
  textBox: {
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    height: '15%',
    fontSize: 15,
    marginBottom: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'grey'
  },
  loginBox: {
    width: '88%',
    height: '44%',
    marginBottom: 30,
    backgroundColor: '#fff',
    marginTop: 300,
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff'
  },
  colorBtn: {
    borderRadius: 50 / 2,
    marginBottom: 5,
    height: 40,
    width: 40,
    margin: 5
  },
  color1: {
    backgroundColor: '#090C08'
  },
  color2: {
    backgroundColor: '#474056'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#B9C6AE'
  },
  colorChoice: {
    flex: 4,
    flexDirection: "row"
  }
})



