
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    searchBar: {
        width: deviceWidth - 20,
        alignSelf: 'center',
        height: 50,
    },
    aSrcdes: {
        margin: 10,
        flex: 1,
    },
    iosSrcdes: {
        margin: 10,
        flex: 1,
    },

  slideSelector: {
    padding: 10,
    backgroundColor: '#eee',
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
  iosPaytmIcon: {
    width: 35,
    height: 13,
    marginTop: 5,
    padding:8,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  aPaytmIcon: {
    width: 35,
    height: 13,
    marginTop: -3,
    padding:8,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  carIcon: {
    color: '#222',
    fontSize: 24
  },
  selectCardContainer: {
    alignItems: 'center',
    padding:0, 
    borderWidth: 0.5
  },
  selectCard: {
    alignItems: 'center',
    padding: 10
  },
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    marginBottom: -7,
    color: '#797979'
  },
  iosHeader: {
    backgroundColor: '#fff', 
    flex:1, 
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25,
    flex:1, 
  },
  searchIcon: {
    fontSize: 20,
    color: '#797979'
  },
});
