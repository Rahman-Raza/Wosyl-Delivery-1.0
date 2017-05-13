'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import polyline from 'polyline';

import {BlurView} from 'react-native-blur';
import ActionCable from 'react-native-actioncable';

 var {CountDownText} = require('react-native-sk-countdown');
 import PushController from '../../PushNotifications/PushController.js'
 import PushNotification from 'react-native-push-notification';


import AwesomeButton from 'react-native-awesome-button';

import { Image, AppState, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, TouchableOpacity,Linking, Modal, } from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import {  TouchableHighlight} from 'react-native';




import Form from 'react-native-form'

import { pushNewRoute, replaceOrPushRoute } from '../../../actions/route';
import { createPickup } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';


import { Header, Content, Text, Button, Icon, Card, Title, InputGroup, Input, CardItem} from 'native-base';
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
var App = {};




function bindAction(dispatch) {
    return {
      openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createPickup: (route,pickup) =>dispatch(createPickup(route,pickup)),
    }
}

function mapStateToProps(state) {

    
    if (state.route.users){
      console.log("checking auth_token");
      console.log(state.route.users.access_token);
        return {
          open: false,
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,
    driver_image: state.route.users.drivers_license_image_thumb_url,


    
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




class driverHome extends Component {

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
       }


    setupSubscription = () => {
      this.setState({websocket:true});
      
       var RecievingHere = (data) => {

        this.Recieving(data);

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
                                        1000);
          console.log("connected to cable for good");
              
        },

        received: function(data) {
          console.log("heres the data for the driver socket", data);
          
          if (!(data.data.type == "pickup_session_finished")){
          RecievingHere(data);
        }

      
          

        },

       
      });
  }

 


       
        static propTypes = {
    first_name: React.PropTypes.string,
   
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  



    constructor(props) {
        super(props);

         
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        
          this.state = {
            seconds: 5,
            itemAccepted: false,
            inDelivery: false,
            pickopen: false,
            accepted: false,
            itemPickupConfirmed: false,
            driver_status:'',
            fooditems:'',
            pickup_from: '',
            pickup_to: '',
            pickup_customer: '',
            pickup_item: '',
            pickup_notes: '',
            modalVisible: true,
            open: false,
            begin: false,

            progress: 0.25,
             isVisible: false,
            fromLocation: 'From: Current Location',
            fromLatitude: 0,
            fromLongtitude: 0,
            toLocation: '',
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

  componentWillMount(){

     navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      console.log("checking navigator", position);
      this.setState({position});

      this.updateLocation();
      
      this.subscribeLocation(position);


    });

  }




  







    componentDidMount() {


      AppState.addEventListener('change',this.handleAppStateChange)
    
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

    componentWillUnmount () {
        App.comments &&
            App.cable.subscriptions.remove(App.comments);
            console.log("finished removing websocket");

        AppState.removeEventListener('change', this.handleAppStateChange);
    }

handleAppStateChange = (appState) => {
   if (appState === 'background') {
      console.log("went to background");
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if (Platform.OS === 'ios') {
        console.log("platform is IOS");
        date = date.toISOString();
        console.log("checking date", date);
      }

     PushNotification.localNotification({
    /* Android Only Properties */
    id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification

   

    /* iOS and Android properties */
    title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message: "My Notification Message", // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
    actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
});
    }
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
       direction: 0
     }
  }

  updateLocation =() => {

    var update_lat = 0;
    var update_long = 0;

if (this.state.position){

  


   update_lat = this.state.position.coords.latitude;
  update_long = this.state.position.coords.longitude;
  console.log("did find position");

}

else{

  
  console.log("position doesnt exists", this.state.position);
update_lat = 38.5404302;
update_long = -121.7232103;


     
   }
  
  this.setState({update_lat: update_lat});
  this.setState({update_long: update_long});

   console.log("checking update position:", this.state.position);
   console.log("checking update_long:", update_long);



  console.log("checking props auth");
  console.log(this.props.auth_token);

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/update_location.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        latitude: update_lat,
                                                        longitude: update_long,
                                                      })
                                                    }).then((response) => response.json())
                                                          .then((responseJson) => {
                                                            console.log("checking update response");
                                                            console.log(responseJson);
                                                            if (responseJson.success){
                                                              console.log("updating gps success",responseJson);

                                                            }

                                                            else{
                                                               



                                                            }
                                                          }).catch((error) => {
                                                            console.log("updating user location error");
                                                            console.error(error);
                                                          });
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
  drawRoute = () => {
    console.log("checking from_latitude poly", this.state.from_latitude);
    console.log("checking from_longitude poly", this.state.from_longitude);
    this._map && this._map.setVisibleCoordinateBounds(this.state.update_lat, this.state.update_long, parseFloat(this.state.from_latitude), parseFloat(this.state.from_longitude), 100, 100, 100, 100);


    fetch('https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin='+this.state.update_lat+','+this.state.update_long+'&destination='+this.state.from_latitude+','+this.state.from_longitude+'&key=AIzaSyBIxUYPeN_bdWQMghHe2I62itZy2uzmm3c', {


                                                      method: 'POST',
                                                      headers: {
                                                       
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.status = 'OK'){

                                                             

                                                               

                                                                     
                                                                     // console.log(responseJson.routes[0].overview_polyline.points);
                                                                     console.log("checking poly response", responseJson);
                                                                     var overview_polyline = polyline.decode(responseJson.routes[0].overview_polyline.points);
                                                                     console.log("overview_polyline:");
                                                                     console.log(overview_polyline);
                                                                     this.setState({overview_polyline: overview_polyline});
                                                                     console.log("checking poly fromCoordinates", this.state.fromCoordinates);
                                                                     console.log("checking poly toCoordinates", this.state.toCoordinates);

                                                                       this.setState({ annotations: [{
                                                          coordinates: this.state.fromCoordinates,
                                                          type: 'point',
                                                          title: 'From:' + this.state.from_location,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: this.props.driver_image, // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 50, // required. number. Image height
                                                                width: 50, // required. number. Image width
                                                              },
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
                                                          title: 'To:' + this.state.to_location,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: 'It has a rightCalloutAccessory too',
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
                                                          strokeColor: '#00FB00',
                                                          strokeWidth: 5,
                                                          strokeAlpha: 1,
                                                          id: 'foobar'
                                                        }




                                                        ]});
                                                        console.log("checking annotations set", this.state.annotations);

                                                                      
                                                                      
                                                    

                                                                
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






  

    

   Recieving = (info) => {

      this.setState({fooditems: "allthefood"});

      if (!this.state.inDelivery){
        this.setState({pickopen: true});
      }


      this.setState({pickup_from: info.data.pickup.pickup_from});
       this.setState({pickup_to: info.data.pickup.pickup_to});
      this.setState({pickup_item: info.data.pickup.item});
      this.setState({pickup_notes: info.data.pickup.notes});
      this.setState({pickup_id: info.data.pickup.id});
       
      this.setState({from_latitude: info.data.pickup.from_latitude});
      this.setState({from_longitude: info.data.pickup.from_longitude});
       this.setState({to_location: info.data.pickup.pickup_from});
      this.setState({to_latitude: info.data.pickup.to_latitude});
      this.setState({to_longitude: info.data.pickup.to_longitude});
      this.setState({ toCoordinates: [parseFloat(info.data.pickup.from_latitude),parseFloat(info.data.pickup.from_longitude) ]});
      this.setState({ fromCoordinates: [this.state.update_lat, this.state.update_long]});
       this.setState({from_location: "My Location"});
       
      
 


      
  }

  subscribeLocation = (position) => {


    if (this.state.pickup_id){


    App.comments.perform('WebNotificationsChannel', 'update_drivers_location',{pickup_id: this.state.pickup_id, latitude:position.coords.latitude, longitude:position.coords.longitude});
    }

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

    onFinishLoadingMap =  () => {
      this.updateLocation();

      if(!this.state.websocket){

        this.setupSubscription();

  
      }
}

AcceptPickup = (accept) => {

  console.log("checking choice",accept);
  var choice = '';

  if (accept){
    
  choice = "accepted";

  this.setState({inDelivery: true});
  this.setState({pickopen:false});
  this.setState({accepted: true});
  this.setState({itemAccepted:true});

  this.drawRoute();
  

  }

  else{
    choice = "rejected";
    this.setState({pickopen:false});
    this.setState({annotations: []});
    this.setState({inDelivery: false});
  }

  console.log("checking state.pickup_id", this.state.pickup_id);
  console.log("checking state.driver_status", choice);
  console.log("checking this.props.auth_token", this.props.auth_token);
  this.setState({begin: true});

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/' +this.state.pickup_id+'/process_driver.json' , {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': this.props.auth_token,
                                                        },
                                                        body: JSON.stringify({
                                                          
                                                         driver_status: choice,
                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {
                                                           console.log("heres the response for choice", responseJson);

                                                            
                                                            });


      

}

LoadRoute = () =>{


    this.setState({begin: false});
 



var url = 'http://maps.apple.com/?saddr='+this.state.update_lat+','+this.state.update_long+'&'+'daddr='+this.state.from_latitude+','+this.state.from_longitude;
      console.log("checking apple route",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}
LoadFinalRoute = () =>{


    this.setState({begin: false});
 



var url = 'http://maps.apple.com/?saddr='+this.state.update_lat+','+this.state.update_long+'&'+'daddr='+this.state.to_latitude+','+this.state.to_longitude;
      console.log("checking apple route",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}



cofirmItemPickedUp = (confirm) => {

  this.setState({itemPickupConfirmed: true});
  this.setState({itemAccepted: false});

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/' +this.state.pickup_id+'/set_item_pickedup.json' , {
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
                                                           console.log("heres the response for setting item picked up", responseJson);

                                                            
                                                            });


}

confirmItemDroppedOff = (confirm) =>{
  console.log("confirm item completed");
  this.setState({accepted: false});
  this.setState({itemPickupConfirmed:false});
  this.setState({itemAccepted: false});
  this.setState({annotations: []});
  this.setState({inDelivery:false});



  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/' +this.state.pickup_id+'/finish_pickup.json' , {
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
                                                           console.log("heres the response for finishing pickup", responseJson);

                                                            
                                                            });



}

driverModeSwitch = () => {

  this.props.replaceOrPushRoute('home');

}


    

      

    render() {



        return (
                 
                <View style={styles.container}>
                  <StatusBar barStyle='default' />
                  <Content theme={theme}>
                  </Content>



                  <View style={styles.map}>
                        {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
                            style={styles.map}
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
                           </Button>
                           <Title> </Title>
                       </Header>
                    
                     </View>

                     <View style={{justifyContent: 'center', alignItems: 'center',position: 'absolute', top:20,left: 140}}> 
                        <Switch
                          onValueChange={(value) => this.driverModeSwitch()}
                          style={{marginBottom: 10}}
                          value={true} />
                          <Text style={{color:'#fff'}}>Driver Mode</Text>
                        
                      </View>

                      


                     
                    
                     {this.state.pickopen && 

                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:120,  backgroundColor: '#000', opacity: .8}}>
                                   
                                       
                                          <Text style={{fontSize: 20, marginBottom: 10, color: '#fff'}}>Incoming Pickup Request</Text>

                                           <View>

                                            <CountDownText
                                                style={{textAlign: 'center',color: 'white',fontSize: 20}}
                                                countType='seconds' // 计时类型：seconds / date 
                                                auto={true} // 自动开始 
                                                afterEnd={() => {this.AcceptPickup(false) }} // 结束回调 
                                                timeLeft={60} // 正向计时 时间起点为0秒 
                                                step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时 
                                                startText='Begin' // 开始的文本 
                                                endText='Time ran out' // 结束的文本 
                                                intervalText={(sec) => sec + ' Seconds left'}/>
                                            </View>
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Pickup Location: {this.state.pickup_from}</Text>
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Dropoff Location: {this.state.pickup_to}</Text>
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Pickup Item: {this.state.pickup_item}</Text>
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Notes: {this.state.pickup_notes}</Text>
                                           <Grid>
                                                <Col style={{padding: 10}}>

                                                    <Button rounded onPress={() => this.AcceptPickup(true)} >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Accept Pickup</Text>
                                                    </Button>

                                                   
                                                </Col>
                                                <Col style={{padding: 10}}>
                                                  <Button rounded onPress={() => this.AcceptPickup(false) } >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Decline Pickup</Text>
                                                  </Button>
                                                </Col>
                                            </Grid>
                                          
                                           
                                          
                                       
                                    
                                </View>}{this.state.accepted && 

                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:120, backgroundColor: '#000', opacity: .8}}>
                                   
                                       
                                          <Text style={{fontSize: 20, marginBottom: 10, color: '#fff'}}>Current Pickup</Text>

                                           <View>

                                            
                                            </View>
                                           {this.state.itemAccepted && <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Pickup Location: {this.state.pickup_from}</Text>}{this.state.itemPickupConfirmed && <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Drop Off Location: {this.state.pickup_to}</Text>}
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Item: {this.state.pickup_item}</Text>
                                           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 10, color: '#fff'}}>Notes: {this.state.pickup_notes}</Text>
                                           <Grid>
                                                
                                                <Col style={{padding: 10}}>{this.state.itemAccepted && <Button rounded onPress={() => this.cofirmItemPickedUp(true) } >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Confirm Pickup</Text>
                                                  </Button>}{this.state.itemPickupConfirmed && <Button rounded onPress={() => this.confirmItemDroppedOff(false) } >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Confirm Delivery</Text>
                                                  </Button>}</Col>
                                                  <Col style={{padding: 10}}>{this.state.itemAccepted &&<Button rounded onPress={() => this.LoadRoute()} >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Start Navigation</Text>
                                                    </Button>}{this.state.itemPickupConfirmed &&<Button rounded onPress={() => this.LoadFinalRoute()} >

                                                      <Text style={{fontWeight: '600',color: '#fff'}}>Start Navigation</Text>
                                                    </Button>}






                                                    
                                                </Col>
                                            </Grid>
                                          
                                           
                                          
                                       
                                    
                                </View>}

                                
                  
                 
                 
                </View>
                
               
        )
    }
}

 






export default connect(mapStateToProps, bindAction)(driverHome);
