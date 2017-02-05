
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    iosSearchBar: {
        width: deviceWidth - 20,
        alignSelf: 'center',
        marginTop: 10,
        flex: 1,
        height: 50,
        position: 'absolute',
        margin: 10

    },
    aSearchBar: {
        width: deviceWidth - 20,
        alignSelf: 'center',
        marginTop: 10,
        flex: 1,
        height: 50,
        margin: 10

    },
    containerButton: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
    container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#696969'
  },
  container2: {
    flex: 2,
    position: 'relative',
    backgroundColor: '#696969'
  },
  slideSelector: {
  	// marginTop: 100,
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
    backgroundColor: '#fff'
  },
  carIcon: {
    color: '#222',
    fontSize: 24
  },
  pinContainer: {
    bottom: deviceHeight/2.2,
    position: 'absolute',
    left: 0,
    right: 0
  },
  pinButton: {
    backgroundColor: '#19192B',
    alignSelf: 'center'
  },
  pin: {
    width: 2,
    height: 15,
    backgroundColor: '#19192B',
    position: 'relative',
    alignSelf: 'center'
  },
  shareContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  shareOptions: {
    paddingLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start'
  },
  shareType: {
    fontSize: 12,
    color: '#23C2E1'
  },
  share: {
    paddingRight: 10,
    padding: 10,
    alignItems: 'flex-end'
  },
  taxiTypeContainer: {
    padding: 15,
    alignItems: 'center'
  },
  taxiType: {
    borderRadius: 18,
    borderWidth: 2,
    opacity: 0.5
  },
  taxi: {
    height: 36,
    width: 36,
    paddingLeft: 7,
    paddingTop: 5
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonText2: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  taxiIcon: {
    fontSize: 15,
    color: '#aaa',
    padding: 5
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: deviceWidth
  },
  iosHeader: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25
  },
  SearchPickText: {
    fontSize: 10,
    color: 'green',
    textAlign: 'center'
  },
  modalStyle: {
    marginTop:40,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 300,
    backgroundColor: '#428bca'

    
  },helpBtn: {
    alignSelf: 'flex-end',
    borderColor: '#797979'
  },
  
  starIcon: {
    color: '#797979',
    fontSize: 18,
    lineHeight: 20
  },modalView: {
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
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 25
  },
  progressBar: {
    paddingLeft:30,
    paddingRight:30
  }

});
