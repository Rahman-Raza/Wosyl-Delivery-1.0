'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import polyline from 'polyline';
import Modal from 'react-native-simple-modal';


import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, ScrollView, DeviceEventEmitter, TouchableOpacity} from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var Orientation = require('react-native-orientation');


import { TouchableHighlight} from 'react-native';


import Form from 'react-native-form'

import { pushNewRoute, replaceOrPushRoute } from '../../../actions/route';
import { createPickup } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';


import { Header, Content, Text, Button, Icon, Card, Title, InputGroup, Input } from 'native-base';
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

  



    constructor(props) {
        super(props);

       
        
          this.state = {
            firstOption: true,
            secondOptions: false,
            
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

  goBack(){
this.setState({secondOptions: false});
     this.setState({firstOption:true});
      

  }

  sendPickup(){
     var pickupItem = {"toLocation" : this.state.toLocation, "toLatitude": this.state.toLatitude, "toLongtitude" : this.state.toLongtitude, 
    "fromLocation" : this.state.fromLocation,"fromLatitude": this.state.fromLatitude, "fromLongtitude" : this.state.fromLongtitude, "delivery_distance":this.state.delivery_distance, "notes" : this.state.notes, "itemPickup" : this.state.itemPickup};
    this.props.createPickup('placeOrder',pickupItem);
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



componentWillMount(){
  var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
   
     DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
}

 componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

 keyboardWillShow (e) {
    
    this.setState({visiblePadding: 200})
  }

  keyboardWillHide (e) {
    this.setState({visiblePadding: 0})
  }

passNonce = (nonce) => {
console.log("got to nonce");
  
}

setupBraintree = () => {

console.log("checking first  auth_token", this.props.auth_token);
fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/get_braintree_token.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                    
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for braintree token",responseJson);
                                                            console.log("checking auth_token", this.props.auth_token);
                                                            
                                                            if (responseJson.success){
                                                              console.log("checking BTC token",responseJson.token );
                                                              BTClient.setup(responseJson.token);
                                                               
                                                                 
                                                            }

                                                            
                                                          })


   
   setTimeout(() => {
      BTClient.showPaymentViewController()
          .then(function(nonce) {
            //payment succeeded, pass nonce to server
            console.log("payment passed");
            //console.log("here the prop", this.props.auth_token);
            console.log("here the nonce", nonce);
            fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/save_nonce.json' , {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                        payment_method_nonce: nonce,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked passing nonce", responseJson);

                                                            
                                                            if (responseJson.success){
                                                              console.log("passing nonce success");
                                                             
                                                                 
                                                            }

                                              
                                                          })




          })
          .catch(function(err) {
            //console.error(err);
          });
    }, 2000);



}

distance_extractor = (data) => {

 console.log("checking data parseFloat",parseFloat(data));
}


    componentDidMount() {

    
      Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    
     



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
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          
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
                                                          subtitle: 'It has a rightCalloutAccessory too',
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
                        
                      </View>}

                                    <Modal
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
                           
                                placeholder='From Location'
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
                                placeholder='To Location'
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
                                      
                                  }
                               }
                               >
                               <Text style={styles.buttonText}>Continue</Text>
                        </Button>

                         <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff', marginBottom:10}}  onPress={() => {
                              this.setupBraintree();
                                  
                                      
                                  }
                               }
                               >
                               <Text style={styles.buttonText}>Paypal</Text>
                        </Button>
                        </View>}{this.state.secondOptions &&

                          <View style={{marginTop: 20}}>
               
                       
               
                     
                        <View style={{padding: 10}}>
                       
                           <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input  onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder="Item"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                        </View>

                       
                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                       <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder="Notes"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                            
                        </View>
                        
                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => {this.sendPickup()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Next</Text>
                          </Button>
                        </View>

                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => {this.goBack()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Back</Text>
                          </Button>
                        </View>
                        
                     </View>




                        }</View>
                
               
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
