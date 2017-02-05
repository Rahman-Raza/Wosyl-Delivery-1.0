
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    
  slideSelector: {
    padding: 10,
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth
  }, 
  iosHeader: {
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    backgroundColor: '#19192B',
    paddingTop: 40
  },
  aHeader: {
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    backgroundColor: '#19192B',
    borderColor: '#19192B',
    elevation: 3,
    paddingTop: 25
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center'
 },
 aHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: -5,
    color: '#fff',
    textAlign: 'center'
 },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerCard: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  pay: {
    fontSize: 18,
    fontWeight: '500',
    color: 'green'
  },
  trip: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14
  },
  helpBtn: {
    alignSelf: 'flex-end',
    borderColor: '#797979'
  },
  
  starIcon: {
    color: '#797979',
    fontSize: 18,
    lineHeight: 20
  },
  modalView: {
    position: 'absolute', 
    bottom: 0,
    width: deviceWidth
  },
  rateCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 0,
    borderColor: '#fff'
  },
  profileIcon: {
    alignSelf: 'center',
    paddingRight: 10,
    color: '#797979'
  },
  ratings: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#fff'
  },
  btnContainer: {
    borderTopWidth: 0.5,
    borderRadius: 0,
    borderColor: '#eee',
    borderBottomColor: '#eee'
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 25
  },

});