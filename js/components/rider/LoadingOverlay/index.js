'use strict';

import React, { Component } from 'react';
import Overlay from 'react-native-overlay';
import BlurView from 'react-native-blur';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform } from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

var {
  ActivityIndicatorIOS,
 
} = React;

class LoadingOverlay extends Component {

  constructor(props) {
      super(props);

      this.state ={
     isVisible: false,
     
    };
    }
    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 

 render(): ReactElement {
    return (
      <Overlay isVisible={this.state.isVisible}>
        <BlurView style={styles.background} blurType="dark">
          <ActivityIndicatorIOS
            size="large"
            animating={true}
            style={styles.spinner} />
        </BlurView>
      </Overlay>
    );
  }
}





function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default LoadingOverlay;