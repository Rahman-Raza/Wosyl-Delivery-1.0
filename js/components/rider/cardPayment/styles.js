
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({

  iosHeader: {
    backgroundColor: '#fff'
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25,
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500'
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5
  },
  cardSelect: {
    margin: 20,
    marginLeft: 20,
    padding: 10,
    marginTop: 0,
    paddingLeft: 0
  },
  payCard: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: -10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  paytmIcon: {
    width: 35,
    height: 13,
    padding: 5,
    paddingTop: 15
  },
});
