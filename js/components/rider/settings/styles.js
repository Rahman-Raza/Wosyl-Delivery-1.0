
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
  profileIcon: {
    alignSelf: 'center',
    padding: 2,
    color: '#aaa',
    fontSize: 50
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0
  },
  input: {
    paddingBottom: 0
  },
  blueBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#24BCD9',
    paddingBottom: 0
  },
  blueHeader:{
    color: '#24BCD9',
    padding: 5
  },
  regBtnContain: {
    paddingVertical: 10,
    paddingHorizontal: 10
 },
 regBtn: {
    borderRadius: 0,
    backgroundColor: '#19192B'
 },
  container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    button: {
        padding: 10,
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    },
    imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
    image: {
      justifyContent: 'center',
    width: 150,
    height: 150,
    margin: 10,
     borderRadius: 75,
  }
  
});