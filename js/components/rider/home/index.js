'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import polyline from 'polyline';
import Modal from 'react-native-simple-modal';
import { createSession } from '../../../actions/route';

var Spinner = require('react-native-spinkit');


import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, ScrollView, DeviceEventEmitter, TouchableOpacity, AsyncStorage,Linking,AppState,TextInput} from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var Orientation = require('react-native-orientation');

import ActionCable from 'react-native-actioncable';
 var {CountDownText} = require('react-native-sk-countdown');
 import StarRating from 'react-native-star-rating';
 import PushController from '../../PushNotifications/PushController.js'
 import PushNotification from 'react-native-push-notification';



import { TouchableHighlight} from 'react-native';


import Form from 'react-native-form'

import { pushNewRoute, replaceOrPushRoute } from '../../../actions/route';
import { createPickup } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';


import { Header, Content, Text, Button, Icon, Card, Title, InputGroup, Input, Container, CardItem,  } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
const accessToken = 'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw';

import Mapbox from 'react-native-mapbox-gl';
Mapbox.setAccessToken(accessToken);
import { MapView } from 'react-native-mapbox-gl';

import styles from './styles';
import theme from '../../../themes/base-theme';


var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

var BTClient = require('react-native-braintree-xplat');
var App = {};


 







class Home extends Component {

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
       }






       
        static propTypes = {

    first_name: React.PropTypes.string,
   
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  componentDidUpdate(){

    this.saveTheState();

  }

  reDrawMap = () => {
    if(!(this.state.toLocation === "To Location") && !(this.state.fromLocation === "From Location")){
 this._map && this._map.setVisibleCoordinateBounds(parseFloat(this.state.fromLatitude), parseFloat(this.state.fromLongtitude), parseFloat(this.state.toLatitude), parseFloat(this.state.toLongtitude), 100, 100, 100, 100);
  this.drawRoute();
  }
}

checkData = (data) =>{
  
  var Data = JSON.parse(data);

    console.log("checking JSON parse ", Data);

    for (var key in Data){
   this.setState( {[key] : Data[key]});

    }

    if (this.state.websocket){
      this.setupSubscription();
    }

    if(!(Data["toLocation"] === "To Location") && !(Data["fromLocation"] === "From Location")){
      console.log("got to drawing route");

      //console.log("checking if map exists or not", this._map);
      console.log("checkign new coords", this.state.fromLatitude, this.state.fromLongtitude, this.state.toLatitude, this.state.toLongtitude);


    }

   this.setState({key: Data[key]});

   console.log("checking this.state.toLocation", this.state.toLocation)
  
}
  componentWillMount(){
  var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
   
     DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));


 AsyncStorage.getItem('State').then((data) => {
           
                console.log("checking empty state or not", data);
                if (data){
                 

                 this.checkData(data);


                  console.log("checking new state", this.state);
                }






              }).done();

}

   componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
      this.wipeTheState();

      AppState.removeEventListener('change', this.handleAppStateChange);
    
<<<<<<< HEAD
    App.comments &&
            App.cable.subscriptions.remove(App.comments);
            console.log("finished removing websocket");
=======
    this.setState({visiblePadding: 200})
>>>>>>> origin/master
  }

  saveTheState (){

var stateJSON = JSON.stringify(this.state);
     AsyncStorage.setItem('State',stateJSON).done();

  }

  wipeTheState = () => {

     AsyncStorage.removeItem('State').then((data) => {
           
                console.log("cleared the syncstorage state");
              }).done();
                
  }

 setupSubscription = () => {

    this.setState({websocket: true});
    console.log("Render");
    console.log(this.props.first_name);

    var setupRecievingHere = (data) => {
      this.setupRecieving(data);
    }

    var itemPickedup = (info) =>{
      this.setState({pickedUP:true});

    }

    var pickupFinished = (info) =>{
      this.setState({pickedUP:false});
      this.setState({droppedOff:true});

    }

     var pickupExpired = () =>{
      this.setState({pickupExpired:true});
      console.log("pickup was expired in state");
      

    }

   

  var updateSession = (info) =>{

    var coords = [parseFloat(info.data.pickup_drivers_location.latitude),parseFloat(info.data.pickup_drivers_location.longitude) ];

    console.log("new coords",coords);

   var newAnnotations = this.state.anootations;
   newAnnotations[0].coordinates = coords;

    this.setState({
  annotations: newAnnotations
});

    




  }

    
    console.log("checking cable auth");
    console.log(this.props.auth_token);
    App.cable = ActionCable.createConsumer('ws://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/cable?auth_token=' + this.props.auth_token);

    App.comments = App.cable.subscriptions.create("WebNotificationsChannel", {
        message_id: "message_id",

        connected: function () {
          // Timeout here is needed to make sure Subscription
          // is setup properly, before we do any actions.
          setTimeout(() => console.log("setting timeout"),
                                        1500);
          console.log("connected to cable for insession");
              
        },

        received: function(data) {

          console.log("checking newData2", data.data.type);
        
        if(data.data.type == "pickup_session_started"){
           
           PushNotification.localNotificationSchedule({
           message: "Your driver is on his way!", // (required)
            date: (new Date(Date.now()  )).toISOString() // 
            });
      
          
          console.log("pickup start did occur", data.type);
          
        setupRecievingHere(data);
        }


       if (data.data.type == "item_pickedup"){

          PushNotification.localNotificationSchedule({
           message: "Your driver has picked up your delivery package.", // (required)
            date: (new Date(Date.now()  )).toISOString() // 
            });
      
          console.log("item pickup did occur2", data.type);

            itemPickedup(data);
        }

       if (data.data.type == "pickup_session_finished"){

         
           PushNotification.localNotificationSchedule({
           message: "Your Delivery has arrived.", // (required)
            date: (new Date(Date.now()  )).toISOString() // 
            });
      

          console.log("item dropoff did occur", data.type);
          pickupFinished(data);
        }
         if (data.data.type == "pickup_expired"){
           
           PushNotification.localNotificationSchedule({
           message: "No Driver Was found", // (required)
            date: (new Date(Date.now()  )).toISOString() // 
            });
      

          console.log("pickup was expired", data.data.type);
          pickupExpired();
        }

      
          

        },

       
      });
   }

   setupRecieving = (info) => {

      

      this.setState({spinnerVisible: false});
            console.log("checking data for pickupID fam", info.data.pickup);
      this.setState({InSession: true});
      this.setState({inOrder: true});

      this.setState({fooditems: "allthefood"});

      this.setState({driver_name: info.data.pickup.driver.first_name});
       this.setState({driver_phone_number: info.data.pickup.driver.phone_no});

      this.setState({driver_image: info.data.pickup.driver.drivers_license_image_thumb_url});
      this.setState({fromCoordinates: [parseFloat(info.data.pickup.driver.latitude),parseFloat(info.data.pickup.driver.longitude)]});
      // this.setState({fromLatitude: parseFloat(info.data.pickup.driver.latitude)});
      // this.setState({fromLongtitude: parseFloat(info.data.pickup.driver.longitude)});
      this.setState({center: {latitude: parseFloat(info.data.pickup.driver.latitude), longitude: parseFloat(info.data.pickup.driver.longitude)}});
      this.setState({pickupID: info.data.pickup.id});
      
      // this.drawRoute2(info);


      // this.setState({ annotations: [{
      //                                                     coordinates: this.state.fromCoordinates,
      //                                                     type: 'point',
      //                                                     title: 'From:' + this.state.from_location,
      //                                                     fillAlpha: 1,
      //                                                     fillColor: '#000000',
      //                                                     strokeAlpha: 1,
      //                                                     subtitle: 'It has a rightCalloutAccessory too',
      //                                                      annotationImage: { // optional. Marker image for type=point
      //                                                           source: {
      //                                                            uri: this.state.driver_image, // required. string. Either remote image URL or the name (without extension) of a bundled image
      //                                                           },
      //                                                           height: 50, // required. number. Image height
      //                                                           width: 50, // required. number. Image width
      //                                                         },
      //                                                     // rightCalloutAccessory: {
      //                                                     //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
      //                                                     //   height: 50,
      //                                                     //   width: 50
      //                                                     // }, 
      //                                                     id: 'marker1'
      //                                                   }
                                                        
                                                        




      //                                                   ]});
  
      
     
       
       
      
 


      console.log("heres the data", info);
    


      
  }

   pickupExpired = () =>{
      this.setState({pickupExpired: true});
      console.log("pickup was expired in state 2");
      this.setState({spinnerVisible: false});
    }

    AcceptOrder = (pickup_driver_id) => {


      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/process_customer' , {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': this.props.auth_token,
                                                        },
                                                        body: JSON.stringify({
                                                          
                                                         pickup_driver_id: pickup_driver_id,
                                                         customer_status: "accepted",

                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {
                                                           console.log("customer placed the order right", responseJson);

                                                            
                                                            });


    

  }

  cleanUpOrder = () =>{
    this.setState({InSession: false});
    this.setState({ })
  }

  handleAppStateChange = (appState) => {
   if (appState === 'background') {
      this.setState({appClosed: true})
      console.log("went to background");
      let date = new Date(Date.now() );

      if (Platform.OS === 'ios') {
        console.log("platform is IOS");
        date = date.toISOString();
        console.log("checking date", date);



        PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
      }


   
    }

  else{
    this.setState({appClosed: false});
  }
}

setopenfalse = () =>{
    this.setState({open: false});
  }
  



 onFinishLoadingMap =  () => {
      

      if(!this.state.websocket){

  this.setupSubscription();
      }


}

onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  }
completeOrder = () =>{
  this.setState({inOrder: false});
  this.setState({InSession: false});
  this.setState({})
  this.setState({orderCompleted: false});
  this.setState({})
 this.props.replaceOrPushRoute('home');
}

destroyOrder = () =>{

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/'+this.state.pickupID+'/cancel_pickup.json' , {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': this.props.auth_token,
                                                        },
                                                        body: JSON.stringify({
                                                          
                                                         

                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {
                                                           console.log("customer was able to cancel the order", responseJson);

                                                            
                                                            });

}

submitRating = () =>{
console.log("checking pickupID worked or not", this.state.pickupID);
console.log("checking auth token for rating", this.props.auth_token);

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/'+this.state.pickupID+'/give_comment_and_rating.json' , {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                        comment: this.state.ratingText,
                                                        rating: this.state.starCount,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for star rating", responseJson);

                                                            
                                                            if (responseJson.success){
                                                              console.log("place review on order success");
                                                              console.log(responseJson);
                                                              this.cleanUpOrder();
                                                               this.props.replaceOrPushRoute('home');
                                                                 
                                                            }

                                                            else{
                                                              
                                                                this.props.replaceOrPushRoute('home');
                                                                 
                                                             

                                                            }
                                                          })
}

callDriver = () =>{ 


var url = 'tel: '+this.state.driver_phone_number;
      console.log("checking apple route for phone call",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}

textDriver = () =>{ 


var url = 'sms: '+this.state.driver_phone_number;
      console.log("checking apple route for phone call",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}

 CancelOrder = () => {
    this.destroyOrder();
    this.setState({spinnerVisible: false});
    this.setState({InSession: false});
    this.props.replaceOrPushRoute('home');
  }




  



    constructor(props) {
        super(props);

       
        
          this.state = {
            firstOption: true,
            secondOptions: false,
            websocket: false,
            open: false,
          currentLocation : {description: 'Current Location', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }},
            alreadyPaid: false,
            usedCurrentLocation: false,
            visiblePadding: 0,
            behavior: 'position',
            progress: 0.25,
             isVisible: false,
            
            fromLatitude: 0,
            fromLongtitude: 0,
            toLocation: 'To Location',
            fromLocation: 'From Location',
            toLatitude: 0,
            toLongtitude: 0,
            itemPickup: '',
            notes: '',


            animationType: 'none',
      modalVisible: true,
    transparent: false,
    selectedSupportedOrientation: 0,
    currentOrientation: 'unknown',
            opacity: 1,
            visible: false,
            uberPoolSelect: true,
            uberGoSelect: false,
            uberXSelect: false,
            uberXLSelect: false,
            a: {
                latitude: LATITUDE ,
                longitude: LONGITUDE,
            },
            b: {
                latitude: 12.910000,
                longitude: 77.586034,
            },
            c: {
                latitude: 12.930000,
                longitude: 77.576034,
            },
            d: {
                latitude: 12.930000,
                longitude: 77.599934,
            }
            
        };

         
        this.uberPool = this.uberPool.bind(this);
        this.uberGo = this.uberGo.bind(this);
        this.uberX = this.uberX.bind(this);
        this.uberXL = this.uberXL.bind(this);
    }


 setModalVisible (visible) {
    this.setState({modalVisible: visible});
  }

  goBack(){
this.setState({secondOptions: false});
     this.setState({firstOption:true});
      this.reDrawMap();
      


  }

    goBack2(){
this.setState({secondOptions: true});
     this.setState({confirmPickup: false});
      this.reDrawMap();

      


  }

  goBack3(){
    this.setState({confirmPickup2: false});
    this.setState({confirmPickup: true});
    this.reDrawMap();
  }

   createSession = (response) => {
      console.log("got to passedNonce");

      this.setState({confirmPickup: false});
      this.setState({confirmPickup2: false});
      this.setState({InSession: true});
      this.setState({spinnerVisible: true});
      console.log("set spinner true");

      
    }


   confirmTransaction = (pickupObject) =>{

      if (this.props.payment_setup){
      this.setState({paymentConfirmation: true});
    }
      else{
        this.setState({paymentConfirmation_setup: true});
      }


    }

  createTransactionAuto = (pickupObject) =>{




      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/create_transaction.json', {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': this.props.auth_token,
                                                        },
                                                        body: JSON.stringify({
                                                           
                                                          amount: this.state.cost,
                                                          pickup_id: pickupObject.pickup.id,
                                                          
                                                          
                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {

                                                              console.log("json worked for create transaction auto");
                                                              
                                                              if (responseJson.success){
                                                                 console.log("passing payment success", responseJson);
                                                                 
                                                                 this.createSession(pickupObject);


                                                                
                                                                   
                                                              }

                                                              else{
                                                                console.log("passing payment auto not success", responseJson);
                                                                this.setState({paymentError: true});

                                                              }
                                                            }).done();
    }

   savePaymentMethod = (nonce) =>{

      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/save_payment_method.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token':this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                         payment_method_nonce: nonce,
                                                        
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for save nonce");
                                                            
                                                            if (responseJson.success){
                                                               console.log("saving user payment info good", responseJson);
                                                               this.setState({userPaymentSaved: true});
                                                             
                                                              


                                                              
                                                                 
                                                            }

                                                            else{
                                                              this.setState({pickupDetailError: true});
                                                              console.log("nothing was sent to save the nonce for customer");
                                                             

                                                            }
                                                          }).done();

    }

  passNonceToServer = (pickupObject) =>{

       var access_token = this.props.auth_token;
       console.log("here access token", access_token);
      var cost = this.state.cost;
      var noncePass = false;

      var scope = this;
      
      function createTheSession(){
        console.log("got to createTheSession");
        scope.createSession(pickupObject);
      }

      function saveThePayment(nonce){
        console.log("got to saveThePayment");
        scope.savePaymentMethod(nonce);
      }

      function checkPaymentSetup(){
        return scope.props.payment_setup
      }

      setTimeout(() => {
            BTClient.showPaymentViewController()
                .then(function(nonce) {
                   saveThePayment(nonce);

      console.log("postman info: access token: ", this.props.auth_token, "pickupID: ", pickupObject.pickup.id, "amount: ", this.state.cost );

                  //payment succeeded, pass nonce to server
                  console.log("payment passed");
                  //console.log("here the prop", this.props.auth_token);
                  console.log("here the nonce", nonce);

                  console.log("check pickupObject", pickupObject);
                  console.log("postman info for passing nonce to server: access_token, nonce, amount, pickup id", access_token, nonce, cost, pickupObject.pickup.id);
                  var paymentObject = {"pickup_id" : pickupObject.pickup.id, "amount" : cost, "payment_method_nonce" : nonce};
                  var JSONObject = JSON.stringify(paymentObject);
                  console.log("checking JSON pay object", JSONObject);
                
                 
                                   
                    fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/create_transaction.json', {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': access_token,
                                                        },
                                                        body: JSON.stringify({
                                                           
                                                          amount: cost,
                                                          pickup_id: pickupObject.pickup.id,
                                                          
                                                          
                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {

                                                              console.log("json worked for save nonce");
                                                              
                                                              if (responseJson.success){
                                                                 console.log("passing payment success", responseJson);
                                                                  passedNonce = true;
                                                                 noncePass = true;
                                                                 createTheSession(pickupObject);


                                                                
                                                                   
                                                              }

                                                              else{
                                                                console.log("passing payment not success", responseJson);
                                                                this.setState({paymentError: true});

                                                              }
                                                            }).done();
                

                  

                }).done();
                console.log("done BTClient");

                
                  
            }, 2000);

     

        
        
    }

      setupBraintree = (pickupObject) => {

      var access_token = this.props.auth_token;
      this.setState({pickupObject: pickupObject});
      var cost = this.state.cost;
     

      console.log("checking first  auth_token", this.props.auth_token);
      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/get_braintree_token.json', {
                                                            method: 'POST',
                                                            headers: {
                                                              'Accept': 'application/json',
                                                              
                                                              'X-Auth-Token': this.props.auth_token,
                                                            },
                                                          
                                                          }) .then((response) => response.json())
                                                                .then((responseJson) => {

                                                                  console.log("json worked for braintree token",responseJson);
                                                                  console.log("checking auth_token", this.props.auth_token);
                                                                  
                                                                  if (responseJson.success){
                                                                    console.log("checking BTC token",responseJson.token );
                                                                    BTClient.setup(responseJson.token);

                                                                    if(this.props.payment_setup == false){
                                                                      console.log("payment_setup is false");
                                                                    this.passNonceToServer(pickupObject);
                                                                  }
                                                                  else{
                                                                    this.confirmTransaction(pickupObject);
                                                                  }

                                                                     
                                                                       
                                                                  }
                                                                    }).done();

        console.log("check cost and pickup id",this.props.cost, pickupObject.pickup.id);

      
    }

   handleErrors = (errors) =>{
      if (errors[0] == "Customer phone no is an invalid number"){
        this.setState({errorPhone: true});
        console.log("got to handleErrors");
      }
    }

  createOrder = () => {
    this.setState({confirmPickup2 : true});
    this.setState({confirmPickup: false});
  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/create.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                        pickup_from : this.state.fromLocation,
                                                        from_latitude: this.state.fromLatitude,
                                                        from_longitude: this.state.fromLongtitude,
                                                        pickup_to: this.state.toLocation,
                                                        to_latitude: this.state.toLatitude,
                                                        to_longitude: this.state.toLongtitude,
                                                        item: this.state.itemPickup,
                                                        customer_phone_no: this.state.contactNumber,
                                                        notes: this.state.notes,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for create pickup");
                                                            
                                                            if (responseJson.success){
                                                              console.log("create pickup success");
                                                              console.log(responseJson);

                                                              this.setupBraintree(responseJson);
                                                              
                                                                 
                                                            }

                                                            else{
                                                             
                                                              console.log("create pickup not success");
                                                              this.handleErrors(responseJson.errors);
                                                              console.log(responseJson);
                                                               this.setState({pickupDetailError: true});
                                                                
                                                                 
                                                             

                                                            }
                                                          })


}

  sendPickup(){
    this.setState({secondOptions :false});
     var pickupItem = {"toLocation" : this.state.toLocation, "toLatitude": this.state.toLatitude, "toLongtitude" : this.state.toLongtitude, 
    "fromLocation" : this.state.fromLocation,"fromLatitude": this.state.fromLatitude, "fromLongtitude" : this.state.fromLongtitude, "delivery_distance":this.state.delivery_distance, "notes" : this.state.notes, "itemPickup" : this.state.itemPickup, "customer_phone_no":this.state.contactNumber};
    //this.props.createPickup('placeOrder',pickupItem);

     var rad = function(x){

      return x * Math.PI / 180;
      }

       var getDistance = function (p1,p2){
          var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round((d * 0.00062137)).toString(); // returns the distance in miles.
        }


      var p1 = {"lat": this.state.fromLatitude, "lng": this.state.fromLongtitude};
      var p2 = {"lat": this.state.toLatitude, "lng": this.state.toLongtitude};
      var distance = getDistance(p1,p2);
      var cost = (parseInt(distance) + 3).toString();

      if(this.state.notes== ""){
        var notes = "N/A"
      }
      else {
        var notes = this.state.notes;
      }
      var cost = (parseInt(this.state.delivery_distance) + 3).toString();

    this.setState({confirmPickup: true});
    this.setState({cost: cost});
    this.setState({notes: notes});
  }

 createPickup(){

        this.setState({modalVisible: false});

    var pickupItem = {"toLocation" : this.state.toLocation, "toLatitude": this.state.toLatitude, "toLongtitude" : this.state.toLongtitude, 
    "fromLocation" : this.state.fromLocation,"fromLatitude": this.state.fromLatitude, "fromLongtitude" : this.state.fromLongtitude, "overview_polyline" : this.state.overview_polyline, "delivery_distance": this.state.delivery_distance};

    if ((!pickupItem.toLocation) || (!pickupItem.fromLocation)){
      console.log("there was no toLocation fool");
      this.setState({open: true});

    }

    else{
      this.setState({pickupPackage: pickupItem});
      this.setState({firstOption:false});
      this.setState({secondOptions: true});
    // this.props.createPickup('createPickup',pickupItem);
    }
  }
  
  inputFocused (refName) {
  setTimeout(() => {
    let scrollResponder = this.refs.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[refName]),
      110, //additionalOffset
      true
    );
  }, 50);
}







 keyboardWillShow (e) {
    
    this.setState({visiblePadding: 150})
  }

  keyboardWillHide (e) {
    this.setState({visiblePadding: 0})
  }

passNonce = (nonce) => {
console.log("got to nonce");
  
}


set_the_nonce_state = (nonce) =>{
  console.log("got to first nonce", nonce);
  this.setState({nonce: nonce});
}

save_nonce = (nonce) =>{
  console.log("got to nonce", nonce);
  

}

distance_extractor = (data) => {

 console.log("checking data parseFloat",parseFloat(data));
}


    componentDidMount() {
            AppState.addEventListener('change',this.handleAppStateChange);
    
      Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    
     if( this.state.server_nonce){
      console.log("server_nonce", this.state.server_nonce);
     }



            navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position});
      console.log("checking position of gps", position);
      this.setState({ currentLocation : {description: 'Current Location', geometry: { location: { lat: position.coords.latitude, lng: position.coords.longitude } }}});
      this.setState({currentLat: position.coords.latitude, currentLong: position.coords.longitude});

    });
    


    
        let that = this;
        setTimeout(function () {
            that.setState({
                visible: true,
            });
        }, 500);
        setTimeout(function () {
            that.setState({
                opacity: 0
            });
        }, 900);


        
    }

    getInitialState() {
    return {
      mapLocation: {
        latitude: 0,
        longitude: 0
       },
       center: {
         latitude: this.state.position.latitude,
         longitude: this.state.position.longitude
       },
       
       zoom: 12,
       
     }
  }

   
  onChange(e) {
    this.setState({ mapLocation: e });
  }
  onOpenAnnotation (annotation) {
    console.log(annotation)
  }
  onUpdateUserLocation (location) {
    console.log(location)
  }
  drawRoute(){
    fetch('https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin='+this.state.fromLatitude + ','+this.state.fromLongtitude+'&destination=' + this.state.toLatitude + ',' + this.state.toLongtitude + '&key=AIzaSyBIxUYPeN_bdWQMghHe2I62itZy2uzmm3c', {
                                                      method: 'POST',
                                                      headers: {
                                                       
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.status = 'OK'){

                                                             

                                                               

                                                                     console.log("here is google legs data with text", responseJson.routes[0].legs[0].distance.text);
                                                                     this.setState({delivery_distance: parseFloat(responseJson.routes[0].legs[0].distance.text)});
                                                                     console.log(responseJson.routes[0].overview_polyline.points);
                                                                     var overview_polyline = polyline.decode(responseJson.routes[0].overview_polyline.points);
                                                                     console.log("overview_polyline:");
                                                                     console.log(overview_polyline);
                                                                     this.setState({overview_polyline: overview_polyline});

                                                                       this.setState({ annotations: [{
                                                          coordinates: this.state.fromCoordinates,
                                                          type: 'point',
                                                          title: 'From:' + this.state.fromLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a7ae8dc81.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 100, // required. number. Image height
                                                                width: 60, // required. number. Image width
                                                              },
                                                          subtitle: " ",
                                                          
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker1'
                                                        },
                                                        {
                                                          coordinates: this.state.toCoordinates,
                                                          type: 'point',
                                                          title: 'To:' + this.state.toLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: " " ,
                                                          annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a7b6f2683.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 100, // required. number. Image height
                                                                width: 60, // required. number. Image width
                                                              },
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker2'
                                                        },
                                                        {
                                                          coordinates: overview_polyline,
                                                          type: 'polyline',
                                                          strokeColor: '#74BFFF',
                                                          strokeWidth: 3,
                                                          strokeAlpha: 1,
                                                          id: 'foobar'
                                                        }




                                                        ]});

                                                                      
                                                                      
                                                    

                                                                
                                                            }

                                                            else{
                                                                console.log("didnt work");



                                                            }
                                                          })
                                                          .catch((error) => {
                                                            console.log("didnt work at all error");
                                                            console.error(error);
                                                          })
  }

drawRoute2 =(info) => {

    this._map && this._map.setVisibleCoordinateBounds(parseFloat(info.data.pickup.driver.latitude), parseFloat(info.data.pickup.driver.longitude), parseFloat(this.props.dropLatitude), parseFloat(this.props.dropLongitude), 100, 100, 100, 100);
    console.log("props lat and long",this.props.pickupLatitude,this.props.pickupLongitude);
    fetch('https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin='+parseFloat(info.data.pickup.driver.latitude)+','+parseFloat(info.data.pickup.driver.longitude)+'&destination=' + this.props.dropLatitude + ',' + this.props.dropLongitude +'&waypoints='+this.props.pickupLatitude+','+this.props.pickupLongitude+'&key=AIzaSyBIxUYPeN_bdWQMghHe2I62itZy2uzmm3c', {
                                                      method: 'POST',
                                                      headers: {
                                                       
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.status = 'OK'){

                                                             

                                                               

                                                                     
                                                                     console.log(responseJson.routes[0].overview_polyline.points);
                                                                     var overview_polyline = polyline.decode(responseJson.routes[0].overview_polyline.points);
                                                                     console.log("overview_polyline:");
                                                                     console.log(overview_polyline);
                                                                     this.setState({overview_polyline: overview_polyline});

                                                                       this.setState({ annotations: [{
                                                          coordinates: [parseFloat(info.data.pickup.driver.latitude),parseFloat(info.data.pickup.driver.longitude)],
                                                          type: 'point',
                                                          title: 'From:' ,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: info.data.pickup.driver.drivers_license_image_thumb_url, // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 25, // required. number. Image height
                                                                width: 25, // required. number. Image width
                                                              },
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker1'
                                                        },
                                                        {
                                                          coordinates: this.props.pickupCoordinates,
                                                          type: 'point',
                                                          title: 'From:' ,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a7ae8dc81.png",// required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 100, // required. number. Image height
                                                                width: 60, // required. number. Image width
                                                              },
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker2'
                                                        },
                                                        {
                                                          coordinates: this.props.dropCoordinates,
                                                          type: 'point',
                                                          title: 'To:' ,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a7b6f2683.png",// required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 100, // required. number. Image height
                                                                width: 60, // required. number. Image width
                                                              },
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker3'
                                                        },
                                                        {
                                                          coordinates: overview_polyline,
                                                          type: 'polyline',
                                                          strokeColor: '#74BFFF',
                                                          strokeWidth: 3,
                                                          strokeAlpha: 1,
                                                          id: 'foobar'
                                                        }




                                                        ]});

                                                                      
                                                                      
                                                    

                                                                
                                                            }

                                                            else{
                                                                console.log("didnt work");



                                                            }
                                                          })
                                                          .catch((error) => {
                                                            console.log("didnt work at all error");
                                                            console.error(error);
                                                          })
  
 }


   


    onDidFocus(){
        console.log('done');
    }
    uberPool() {
        this.setState({uberPoolSelect: true,uberXLSelect: false,uberXSelect: false,uberGoSelect: false});
    }
    uberGo() {
        this.setState({uberPoolSelect: false,uberXLSelect: false,uberXSelect: false,uberGoSelect: true});
    }
    uberX() {
        this.setState({uberPoolSelect: false,uberXLSelect: false,uberXSelect: true,uberGoSelect: false});
    }
    uberXL() {
        this.setState({uberPoolSelect: false,uberXLSelect: true,uberXSelect: false,uberGoSelect: false});
    }
    putLogo = () => {

      return ( <Image style={{marginRight:10}} source={require('../home/half1.png')}>
                </Image>)
    }

    checkCurrentLocationUsed = () => {
      if (this.state.usedCurrentLocation){
        return false
      }

      else{
        return true
      }
    }

    driverModeSwitch = () => {

  this.props.replaceOrPushRoute('driverHome');

}


    
    render() {


      if (!this.state.alreadyPaid){

        if(this.props.auth_token){

        
        this.setState({alreadyPaid: true});
        }
        
      }
        return (
                 
                <View style={styles.container}>
                  <StatusBar barStyle='light-content' networkActivityIndicatorVisible='true' />
                  <Content theme={theme}>
                  </Content>

                  <View style={styles.map}>
                        {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
                            style={styles.map}
                             styleURL={Mapbox.mapStyles.dark}   
                            rotateEnabled={true}
                            zoomEnabled={true}
                            showsUserLocation={true}
                            attributionButtonIsHidden = {false}
                            logoIsHidden = {true}
                            compassIsHidden = {true}
                            accessToken={'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw'}
                            initalZoomLevel = {13}
                            centerCoordinate={this.state.center}
                            userLocationVisible={true}
                            userTrackingMode = {Mapbox.userTrackingMode.follow}
                            annotations={this.state.annotations}
                            annotationsAreImmutable
                            onFinishLoadingMap = {this.onFinishLoadingMap}
                            
                            
                            debugActive={false}
                            direction={this.state.direction}
                            
                            
                            onOpenAnnotation={this.onOpenAnnotation}
                            onUpdateUserLocation={this.onUpdateUserLocation}/>)
                        : <View />
                        }
                    </View>
                    
                  <View style={styles.headerContainer}>
                       <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                           <Button transparent  onPress={ this.props.openDrawer

                           } >
                               <Icon name='ios-menu' />
                           </Button>{!this.props.is_driver_verified && <Title style={{marginTop:15, marginRight:10}}> <Image style={{marginRight:18, marginTop: 15}} source={require('../home/half1.png')}></Image></Title>}</Header>
                    
                     </View>{this.props.is_driver_verified &&
                            <View style={{justifyContent: 'center', alignItems: 'center',position: 'absolute', top:20,left: 140}}> 
                        <Switch
                          onValueChange={(value) => this.driverModeSwitch()}
                          style={{marginBottom: 10}}
                          value={false} />
                          <Text style={{color:'#fff'}}>Driver Mode</Text>
                        
                      </View>}{!this.props.is_driver_verified &&
                           <View style={{justifyContent: 'center', alignItems: 'center',position: 'absolute', top:20, left: 260}}> 
                        <Button transparent  onPress={ this.props.openDrawer} >
                               
                               <Text style={{color:'#fff'}}>Current Order</Text>
                        </Button>
                          
                        
                      </View>}<Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.open}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({open: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                       <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({open: false})}>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please enter a pickup location and destination</Text>
                                          
                                          
                                             
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>{this.state.firstOption && 

                                      <View style={{padding: 10}}>
                        
       
                   
 
                       
                           <GooglePlacesAutocomplete
                           
                                placeholder= {this.state.fromLocation}
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                

                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  console.log("checking details.name", details.name);
                                  if (details.name){
                                    this.setState({fromLocation:details.name});
                                  }
                                  else{
                                    console.log("checking google details", details);
                                    this.setState({fromLocation: this.props.first_name+" 's"+" Current Location"});

                                  }
                                  this.setState({fromLatitude:details.geometry.location.lat});
                                  
                                  this.setState({fromLongtitude:details.geometry.location.lng});
                                  console.log("checking from long");
                                  console.log(this.state.fromLatitude,this.state.fromLongtitude);
                                  this.setState({ fromCoordinates: [parseFloat(details.geometry.location.lat),parseFloat(details.geometry.location.lng) ]});
                                  
                                  console.log("checking parseFloat:");
                                  console.log(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng));
                                  
                                  this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng),13);
                                  this.setState({ annotations: [{
                                                          coordinates: this.state.fromCoordinates,
                                                          type: 'point',
                                                          title: this.state.fromLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a5f87e60f.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 50, // required. number. Image height
                                                                width: 50, // required. number. Image width
                                                              },
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker1'
                                                        }]});
                                  
                                  

                                  



                                }}
                                getDefaultValue={() => {
                                  return ''; // text input default value
                                }}
                                query={{
                                  // available options: https://developers.google.com/places/web-service/autocomplete
                                  key: 'AIzaSyCx4LyiTDnAAgJLnSeVSVKR3uAQPsslXxg',
                                  language: 'en', // language of the results
                                  
                                }}
                                 styles={{
                                  textInputContainer: {
                                    backgroundColor: '#fff',
                                    borderTopWidth: 1,
                                    borderBottomWidth:1,
                                     borderRadius: 20,
                                     borderColor: '#000',
                                     borderLeftColor: '#000',
                                     borderRightColor: '#000',
                                     borderTopColor: '#000',
                                     borderBottomColor: '#000',
                                     borderLeftWidth: 1,
                                     borderRightWidth: 1,
                                     color: 'black',

                                  },

                                  textInput: {
                                  backgroundColor: '#fff',
                                  color: 'black',
                                  
                                  },
                                  
                                  
                                  description: {
                                     backgroundColor: '#fff',
                                    fontWeight: 'bold',
                                  },
                                  predefinedPlacesDescription: {
                                    color: '#1faadb',
                                  }, 
                                  listView:{
                                    backgroundColor: '#fff',
                                  },
                                  poweredContainer: {
                               
                                    borderRadius: 30,

                                  },
                                  container:{
                                    
                                     borderRadius: 30,
                                     borderRightRadius: 25,
                                     borderLeftRadius: 25,
                                     borderBottomRadius: 25,
                                     flex: 3,
                                     marginLeft: 30, marginRight:30,

                                  
                                },
                              }}
                                enablePoweredByContainer = {false}
                                  // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                  rankby: 'distance',
                                  types: 'food',
                                }}

                                predefinedPlaces={[this.state.currentLocation]}
                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                            </GooglePlacesAutocomplete>

                              
                            
                        </View>}{ this.state.firstOption &&
                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                       
                            <GooglePlacesAutocomplete
                                placeholder= {this.state.toLocation}
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                
                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  if (details.name){

                                    this.setState({toLocation:details.name});
                                  }
                                  else{
                                    
                                    this.setState({toLocation:'Current Location'});
                                  }
                                  
                                  this.setState({toLatitude:details.geometry.location.lat});
                                  this.setState({toLongtitude:details.geometry.location.lng});
                                   this.setState({ toCoordinates: [parseFloat(details.geometry.location.lat),parseFloat(details.geometry.location.lng) ]});
                                   if (details.name == 'Current Location'){
                                    this.setState({usedCurrentLocation: true});
                                  }
                                  console.log("checking parseFloat:");
                                  console.log(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng));

                                  if(this.state.fromLocation){
                                  
                                  this._map && this._map.setVisibleCoordinateBounds(parseFloat(this.state.fromLatitude), parseFloat(this.state.fromLongtitude), parseFloat(this.state.toLatitude), parseFloat(this.state.toLongtitude), 100, 100, 100, 100);
                                   this.drawRoute();

                                 }

                                 else{
                                  this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng),13);

                                  this.setState({ annotations: [{
                                                          coordinates: this.state.toCoordinates,
                                                          type: 'point',
                                                          title: this.state.toLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a5f87e60f.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 50, // required. number. Image height
                                                                width: 50, // required. number. Image width
                                                              },
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker3'
                                                        }]});
                                 }
                                
                                this._map && this._map.selectAnnotation("marker1",false);
                                this._map && this._map.selectAnnotation("marker2",false);
                                  }}
                                getDefaultValue={() => {
                                  return ''; // text input default value
                                }}
                                query={{
                                  // available options: https://developers.google.com/places/web-service/autocomplete
                                  key: 'AIzaSyCx4LyiTDnAAgJLnSeVSVKR3uAQPsslXxg',
                                  language: 'en', // language of the results
                                  
                                }}
                                styles={{
                                  textInputContainer: {
                                    backgroundColor: '#fff',
                                    borderTopWidth: 1,
                                    borderBottomWidth:1,
                                     borderRadius: 20,
                                     borderColor: '#000',
                                     borderLeftColor: '#000',
                                     borderRightColor: '#000',
                                     borderTopColor: '#000',
                                     borderBottomColor: '#000',
                                     borderLeftWidth: 1,
                                     borderRightWidth: 1,
                                     color: 'black',

                                  },

                                  textInput: {
                                  backgroundColor: '#fff',
                                  color: 'black',
                                  
                                  },
                                  
                                  
                                  description: {
                                     backgroundColor: '#fff',
                                    fontWeight: 'bold',
                                  },
                                  predefinedPlacesDescription: {
                                    color: '#1faadb',
                                  }, 
                                  listView:{
                                    backgroundColor: '#fff',
                                  },
                                  poweredContainer: {
                                
                                    borderRadius: 30,

                                  },
                                  container:{
                                    
                                     borderRadius: 30,
                                     borderRightRadius: 25,
                                     borderLeftRadius: 25,
                                     borderBottomRadius: 25,
                                     flex: 3,
                                     marginLeft: 30, marginRight:30,

                                  
                                },
                              }}

                                enablePoweredByContainer = {false}
                                  // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                  rankby: 'distance',
                                  types: 'food',
                                }}

                                predefinedPlaces={[this.state.currentLocation]}
                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                                
                            </GooglePlacesAutocomplete>
                            
                        </View>}{this.state.firstOption &&
                          <View style={{padding: 10}}>


                        <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff', marginBottom:10}}  onPress={() => {
                                       if (this.state.fromLatitude == 0 ){
                                           
                                        this.state.fromLatitude =  this.state.position.coords.latitude;
                                        this.state.fromLongtitude =  this.state.position.coords.longitude;
                                        console.log(this.state.fromLatitude);
                                     }

                                     console.log("checking center");   
                                       console.log(this.state.center);   
                                     this.createPickup();
                                     this.reDrawMap();

                                   
                                      
                                  }
                               }>
                               <Text style={styles.buttonText}>Continue</Text>
                        </Button>

                        
                        </View>}{this.state.secondOptions &&

                          <View style={{marginTop: 20}}>
               
                       
               
                     
                        <View style={{padding: 10}}>
                       
                           <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input  onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder="Item"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                        </View>

                       
<<<<<<< HEAD
                        <View style={{padding: 10,}}>
                       <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input keyboardType="phone-pad" onChangeText={(text) => this.setState({contactNumber:text})} value={this.state.contactNumber}placeholder="Contact Number"  placeholderTextColor="#000" />




                            </InputGroup>
                            
                        </View>

=======
>>>>>>> origin/master
                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                      

                             <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder="Notes"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                            
                            
                        </View>
                        
                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 70, marginRight:70,marginTop: 10, borderColor:'#fff'}} onPress={() => {this.sendPickup()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Next</Text>
                          </Button>
                        </View>

                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 70, marginBottom: 30, marginRight:70, borderColor:'#fff'}} onPress={() => {this.goBack()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Back</Text>
                          </Button>
                        </View>
                        
                     </View>




                        }{this.state.confirmPickup &&

                           <View style={{paddingBottom: 150}}>
                   
                   
                    
                    <Text style={styles.buttonText2}>Order Details</Text>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>From: {this.state.fromLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>To: {this.state.toLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Item: {this.state.itemPickup}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Notes: {this.state.notes}</Text>
                    </View>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Estimated cost: $3 Base Fee + {this.state.delivery_distance} miles x $1 per mile = ${this.state.cost}</Text>
                    </View>


                    <Button rounded bordered block style={{marginLeft: 30, marginRight:30,  backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',}} onPress={() => {
                    console.log("checking locations");
                    console.log(this.props.fromLatitude);
                    console.log(this.props.toLatitude);

                    this.createOrder();


                    
                                                          


              
            }}  underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Place Order</Text>
                  </Button>

                  <Button rounded bordered block style={{marginLeft: 30, marginRight:30,marginTop:10,  backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',}} onPress={() => {
                   
                    this.goBack2();


                    
                                                          


              
            }}  underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Go Back</Text>
                  </Button>


                 
                    </View>




           }{this.state.pickupExpired && this.state.InSession &&
               <View style={{marginTop: 250, alignItems: 'center',marginBottom:150,backgroundColor: '#000', opacity: .8 }} >
                
                 
                                   
                                       
                                          <Text style={{fontSize: 20, marginTop:10, marginBottom: 10, color: '#fff'}}>No Driver Found...Sorry</Text>

                                          
                                            
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                                                      <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.CancelOrder()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Go Back Home</Text>
                                                      </Button>
                                            </View>

                                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>    </Text>
                                                      
                                            </View>

                                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>    </Text>
                                                      
                                            </View>


                                         

                                                   
                                                                                      
                                           
                                          
                                       
                                    
                                </View>
            }{this.state.spinnerVisible && 
                <View style={{marginTop: 250, alignItems: 'center',marginBottom:120,backgroundColor: '#000', opacity: .8 }} >
                
                 
                    <Spinner style={{marginRight: 20}} isVisible={true} size={100} type={'Circle'} color={"#3DA000"}/>
                                   
                                       
                                          <Text style={{fontSize: 20, marginTop:30, marginBottom: 10, color: '#fff'}}>Looking for Driver...</Text>

                                           <View>

                                              <CountDownText
                                                  style={{textAlign: 'center',color: 'white',fontSize: 20}}
                                                  countType='seconds' // 计时类型：seconds / date 
                                                  auto={true} // 自动开始 
                                                  afterEnd={() => {this.setState({spinnerVisible:false}) }} // 结束回调 
                                                  timeLeft={120} // 正向计时 时间起点为0秒 
                                                  step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时 
                                                  startText= ''// 开始的文本 
                                                  endText= ''// 结束的文本 
                                                  intervalText= {(sec) => '' }/>
                                              </View>
                                            
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                                                      <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.CancelOrder()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Cancel Order</Text>
                                                      </Button>
                                            </View>

                                         

                                                   
                                                                                      
                                           
                                          
                                       
                                    
                                </View>

                
            }{this.state.confirmPickup2 &&   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>


                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.pickupDetailError}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({pickupDetailError: false, confirmPickup: true})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please check your order details and Try again.</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({pickupDetailError: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.errorPhone}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({errorPhone: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please enter a valid phone number starting with a 1.</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({errorPhone: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentError}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentError: false,  confirmPickup: true})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>There was an issue with your payment, please try again.</Text>


                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentError: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentConfirmation}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentConfirmation: false})}
                                       style={{alignItems: 'center', marginBottom:150}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Would you like to continue with your previously used payment method or use a different one?</Text>

                                          <Button rounded bordered block style={{marginLeft: 30, marginRight:30,  backgroundColor: '#48BBEC',borderColor: '#48BBEC',}} onPress={() => {
                                                              this.createTransactionAuto(this.state.pickupObject);
                                                              this.setState({paymentConfirmation:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>Continue</Text>
                                            </Button>
                                            <Button rounded bordered block style={{marginLeft: 30, marginRight:30, marginTop:20, backgroundColor: '#48BBEC',
                                              borderColor: '#48BBEC',}} onPress={() => {
                                                              

                                                              this.passNonceToServer(this.state.pickupObject);
                                                              this.setState({paymentConfirmation:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>New Payment</Text>
                                            </Button>

                                             <Button rounded bordered block style={{marginLeft: 30, marginRight:30,marginTop:10,  backgroundColor: '#48BBEC',
                                                    borderColor: '#48BBEC',}} onPress={() => {
                   
                                                        this.goBack3(); }}  
                                                        underlayColor='#99d9f4'>
                                                <Text style={styles.buttonText}>Go Back</Text>
                                              </Button>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentConfirmation: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                     <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentConfirmation_setup}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentConfirmation_setup: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                         
                                            <Button rounded bordered block style={{marginLeft: 30, marginRight:30, marginTop:20, backgroundColor: '#48BBEC',
                                              borderColor: '#48BBEC',}} onPress={() => {
                                                              

                                                              this.passNonceToServer(this.state.pickupObject);
                                                              this.setState({paymentConfirmation_setup:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>New Payment Setup</Text>
                                            </Button>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentConfirmation_setup: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>
                                </View>}{this.state.inOrder && 
          <Container style={{marginTop:125}}>
                <Content style={{ opacity: .8}}>
                    <Card>
                        <CardItem style={{alignItems: 'center'}}>
                            
                            <Text>Your Driver: {this.state.driver_name}</Text>
                             <Text onPress={() => this.callDriver()}>Phone Number: {this.state.driver_phone_number}</Text>

                            
                        </CardItem>

                        <CardItem style={{alignItems: 'center'}}>
                            <Image style={{justifyContent: 'center',
                                            width: 150,
                                            height: 150,
                                            margin: 10,
                                             borderRadius: 75,marginLeft:100}} source={{uri: this.state.driver_image}} />
                        </CardItem>
                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.callDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Call Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>

                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.textDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Text Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>



                        <CardItem>
                            <Grid>  
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Col style={{padding: 10,alignItems: 'center'}}>{(!this.state.pickedUP && !this.state.droppedOff)&&<Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}>Your Driver is on his way!</Text>}{this.state.pickedUP && <Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}> Your Driver has picked up your order</Text>}{this.state.droppedOff &&
                          <Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}> Your driver is here with your order, thank you for using Wosyl! </Text>}{this.state.droppedOff && <Button style={{marginLeft:100,marginTop:10}}rounded onPress={() => this.completeOrder()} >
                          <Text style={{fontWeight: '800',color: '#000'}}>Comment and Rate</Text>
                          </Button>}</Col>
                        </View>
                            </Grid>
                        </CardItem>
                   </Card>
                </Content>
            </Container>}{this.state.orderCompleted && 
          <Container style={{marginTop:225}}>
                <Content style={{ opacity: .9}}>
                    <Card>
                        <CardItem style={{alignItems: 'center'}}>
                            
                            <Text>Please Rate your Driver {this.state.first_name}</Text>
                            
                        </CardItem>

                        <CardItem>
                            <Grid>  
                        
                        <Col style={{padding: 10,alignItems: 'center'}}>
                        <TextInput
                                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                editable = {true}
                                maxLength = {140}
                                multiline = {true}
                                placeholder= 'Please comment on your delivery'
                                style={{height: 60, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(text) => this.setState({ratingText: text})}
                                value={this.state.ratingText}/>
                         
                        </Col>
                        
                            </Grid>
                        </CardItem>

                        <CardItem>
                            <Grid>  
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Col style={{padding: 10,alignItems: 'center'}}>
                      
                         <StarRating 
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starColor={'#3DA000'}/>


                                <Button style={{marginLeft: 40, marginTop:10}} rounded onPress={() => this.submitRating()} >
                          <Text style={{fontWeight: '600',color: '#fff'}}>Submit Review</Text>
                          </Button>
                        </Col>
                        </View>
                            </Grid>
                        </CardItem>
                   </Card>
                </Content>
            </Container>}</View>
                
               
        )
    }
}

 


function bindAction(dispatch) {
    return {
      openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createPickup: (route,pickup) =>dispatch(createPickup(route,pickup)),
        createSession: (route,pickup) =>dispatch(createSession(route,pickup)),
    }
}

function mapStateToProps(state) {

    console.log("checkinguserset");
    console.log(state);
    if (state.route.users){
        return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,
    is_driver_verified: state.route.users.is_driver_verified,
    payment_setup: state.route.users.payment_setup,

    
  }
    }
 

    else{
  return {
    first_name: "first Name",
    last_name: "lastname",
    email: "email",
    phone_no: "phone number",
    
  }
}
}




export default connect(mapStateToProps, bindAction)(Home);
