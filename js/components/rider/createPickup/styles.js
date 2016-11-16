
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    
  
  iosHeader: {
    backgroundColor: '#fff',
    paddingTop: 20
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25
  },
  container: {
    flex: 1,
    position: 'relative',
    
  },
  container2: {
    flex: 2,
    position: 'relative',
    backgroundColor: '#696969'
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500'
 },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: deviceWidth
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
    color: 'white',
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
    
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    
   
    justifyContent: 'center',

    
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  modalStyle: {
    marginTop:20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 300,
    backgroundColor: 'transparent'

    
  },
  progressBar: {
    paddingLeft:30,
    paddingRight:30
  }
 

});