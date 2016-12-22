
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    
  iosLogoContainer: {
    top: deviceHeight/4.5,
    alignItems: 'center',
   
  },
  aLogoContainer: {
    top: deviceHeight/3,
    alignItems: 'center',
    height: deviceHeight/1.5,
    
  },
   backgroundImage: {
        flex: 1,
        width: null,
        height: 1000,
        resizeMode: 'stretch',

    },
  logoIcon: {
    color: '#eee',
    fontSize: 100
  },
  logoText: {
    color: '#eee',
    fontWeight: '700', 
    fontSize: 40,
    lineHeight: 40,
    marginTop: 30,
    backgroundColor: 'transparent'
  },
  loginBtn: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#19192B'
  },
  registerBtn: {
    borderRadius: 0,
    backgroundColor: '#19192B'
  },
});