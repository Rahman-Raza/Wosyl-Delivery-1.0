'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import polyline from 'polyline';


import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, ScrollView, DeviceEventEmitter} from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

import { Modal, TouchableHighlight} from 'react-native';


import Form from 'react-native-form'

import { pushNewRoute } from '../../../actions/route';
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

var BTClient = require('react-native-braintree');
BTClient.setup("eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIxNDM1MzU4MGM0NmQwY2ZlMDJiMjFjNDZjNjkzNzBjZTE0NTI3MGI3ZjIwN2YzMGE4MTUxYjlmODhjZTI4NTNifGNyZWF0ZWRfYXQ9MjAxNi0xMC0yN1QwNDowNDoxMC45NzgwMDEyNDArMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=");









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
            visiblePadding: 0,
            behavior: 'position',
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
 createPickup(){

        this.setState({modalVisible: false});

    var pickupItem = {"toLocation" : this.state.toLocation, "toLatitude": this.state.toLatitude, "toLongtitude" : this.state.toLongtitude, 
    "fromLocation" : this.state.fromLocation,"fromLatitude": this.state.fromLatitude, "fromLongtitude" : this.state.fromLongtitude, "overview_polyline" : this.state.overview_polyline};
    this.props.createPickup('createPickup',pickupItem);
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

     DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
}

 keyboardWillShow (e) {
    
    this.setState({visiblePadding: 200})
  }

  keyboardWillHide (e) {
    this.setState({visiblePadding: 0})
  }




    componentDidMount() {

//       BTClient.showPaymentViewController().then(function(nonce) {
//   //payment succeeded, pass nonce to server
// })
// .catch(function(err) {
//   //error handling
// });



            navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position});
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
       direction: 0
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
                                                          strokeColor: '#40E0D0',
                                                          strokeWidth: 5,
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
                           <Title>Wosyl Delivery</Title>
                       </Header>
                    
                     </View>
        
                  
                     <View style={styles.modalStyle}>
               
                         
              
                   
                        <View style={{padding: 10}}>
                        
       
                   
 
                       
                           <GooglePlacesAutocomplete
                           
                                placeholder='From Location'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  this.setState({fromLocation:details.name});
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


                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                            </GooglePlacesAutocomplete>

                              
                            
                        </View>
                    


                        
                        
                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                       
                            <GooglePlacesAutocomplete
                                placeholder='To Location'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  this.setState({toLocation:details.name});
                                  this.setState({toLatitude:details.geometry.location.lat});
                                  this.setState({toLongtitude:details.geometry.location.lng});
                                   this.setState({ toCoordinates: [parseFloat(details.geometry.location.lat),parseFloat(details.geometry.location.lng) ]});
                                  
                                  console.log("checking parseFloat:");
                                  console.log(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng));
                                  
                                  
                                  this._map && this._map.setVisibleCoordinateBounds(parseFloat(this.state.fromLatitude), parseFloat(this.state.fromLongtitude), parseFloat(this.state.toLatitude), parseFloat(this.state.toLongtitude), 100, 100, 100, 100);
                                   this.drawRoute();
                                
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


                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                            </GooglePlacesAutocomplete>
                            
                        </View>
                        <View style={{padding: 10}}>
                        <Button rounded transparent bordered block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}}  onPress={() => {
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
                               underlayColor='#99d9f4'>
                               <Text style={styles.buttonText}>Continue</Text>
                        </Button>
                        </View>
                       

                     </View>
                 
                </View>
                
               
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
