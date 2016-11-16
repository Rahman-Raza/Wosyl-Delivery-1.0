
'use strict';

import { StyleSheet,PixelRatio } from "react-native";
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
    paddingTop: 25
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
 payCardInput: {
    width: deviceWidth/4,
    paddingRight: 20
 },
 
});