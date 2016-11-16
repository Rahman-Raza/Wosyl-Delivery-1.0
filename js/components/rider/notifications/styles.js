
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    
  notCard: {
    height: deviceHeight/4,
    width: null,
  },
  iosHeader: {
    backgroundColor: '#fff'
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25
  },
  iosHeaderText: {
    fontSize: 18,
    fontWeight: '500'
  },
  aHeaderText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5
  },
  container: {
    backgroundColor: '#19192B',
    padding: 20,
  },
  contentHeading: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  shareText: {
    textAlign: 'center',
    margin: 40,
    color: '#fff',
    fontWeight: '600'
  },

});