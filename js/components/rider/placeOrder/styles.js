
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    
  
  iosHeader: {
    backgroundColor: '#fff',
    paddingTop: 40
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
 orText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '700'
 },
 regBtnContain: {
    paddingVertical: 20,
    paddingHorizontal: 10
 },
 regBtn: {
    borderRadius: 0,
    backgroundColor: '#19192B'
 },
 progressBar: {
    paddingLeft:30,
    paddingRight:30
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  buttonText2: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  formButton: {
    height: 24,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 30, 
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20
  },
 

});