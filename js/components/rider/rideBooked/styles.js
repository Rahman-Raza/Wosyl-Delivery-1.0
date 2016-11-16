
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    searchBar: {
        width: deviceWidth,
        alignSelf: 'center',
        height: 50,
        borderRadius: 0
    },
    srcdes: {
        flex: 1,
    },
   
  slideSelector: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth
  }, 
  
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  driverInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  driverInfo: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#eee',
    marginTop: -10
  },
  carInfo: {
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#eee',
    marginTop: -10
  },
  card: {
    alignItems: 'center',
    padding:0, 
    borderWidth: 0.5
  },
  btn: {
    alignItems: 'center',
    padding: 10
  },
  btnText: {
    fontSize: 13,
    lineHeight: 15,
    color: '#797979'
  },
  waitTime: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    color: '#797979'
  },
  headerContainer: {
    position: 'absolute', 
    top: 0, 
    width: deviceWidth
  },
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
  confirmation: {
    textAlign: 'center',
    marginTop: -3,
    fontSize: 14
  },
  
});