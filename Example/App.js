/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import RNSiriWaveView from 'react-native-siri-wave-view'

export default class App extends Component<{}> {
  constructor (props) {
    super(props)
  }

  render() {
    return <View style={styles.container}>
        <RNSiriWaveView ref={(s) => { this._siri = s; }} type={0} width={800} height={750} startAnimation={this.state.startAnimation} stopAnimation={this.state.stopAnimation} />

        <TouchableOpacity style={[styles.button]} onPress={() => {
          this._siri.startAnimation()
        }}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => {
          this._siri.stopAnimation()
        }}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column"
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "#add8e6",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});