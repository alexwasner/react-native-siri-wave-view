import React, { Component } from "react";
import ReactNative,{ StyleSheet, ViewPropTypes, Platform, UIManager } from "react-native";
import PropTypes from "prop-types";

import { requireNativeComponent } from "react-native";

class RNSiriWaveView extends Component {
  constructor(props) {
    super(props)
  }
  startAnimation(){
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this._siri),
      UIManager.RNSiriWaveView.Commands.toggleAnimation,
      [true]
    );
  }
  stopAnimation(){
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this._siri),
      UIManager.RNSiriWaveView.Commands.toggleAnimation,
      [false]
    );
  }
  render() {
      return <SiriWaveView style={{ width: this.props.width, height: this.props.height }} 
        ref={(s) => { this._siri = s; }}
        props={{
          width: this.props.width,
          height: this.props.height,
          numberOfWaves: this.props.numberOfWaves,
          backgroundColor: this.props.backgroundColor,
          waveColor: this.props.waveColor,
          primaryWaveLineWidth: this.props.primaryWaveLineWidth,
          secondaryWaveLineWidth: this.props.secondaryWaveLineWidth,
          frequency: this.props.frequency,
          idleAmplitude: this.props.idleAmplitude,
          amplitude: this.props.amplitude,
          density: this.props.density,
          phaseShift: this.props.phaseShift,
          intensity: this.props.intensity,
          colors: this.props.colors,
          type: this.props.type
        }}
      />;
  }
}

RNSiriWaveView.propTypes = {
  ...ViewPropTypes,

  width: PropTypes.number,
  height: PropTypes.number,
  props: PropTypes.object,

  numberOfWaves: PropTypes.number,
  backgroundColor: PropTypes.string,
  waveColor: PropTypes.string,
  primaryWaveLineWidth: PropTypes.number,
  secondaryWaveLineWidth: PropTypes.number,
  frequency: PropTypes.number,
  idleAmplitude: PropTypes.number,
  amplitude: PropTypes.number,
  density: PropTypes.number,
  phaseShift: PropTypes.number,

  type: PropTypes.number,

  startAnimation: PropTypes.bool,
  stopAnimation: PropTypes.bool
};

RNSiriWaveView.defaultProps = {
  width: 200,
  height: 100,

  numberOfWaves: 5,
  backgroundColor: "#FFFFFF",
  waveColor: "#000000",
  primaryWaveLineWidth: Platform.OS === "ios" ? 3 : 50,
  secondaryWaveLineWidth: 1,
  frequency: 1.5,
  idleAmplitude: 0.01,
  amplitude: 0.01,
  density: 5,
  phaseShift: -0.15,
  intensity: 0.3,
  colors: ["#2085fc", "#5efca9", "#fd4767"],

  type: 0,

  startAnimation: false,
  stopAnimation: false
};

// RNSiriWaveView.

const SiriWaveView = requireNativeComponent(
  "RNSiriWaveView",
  RNSiriWaveView
);

export default RNSiriWaveView;
