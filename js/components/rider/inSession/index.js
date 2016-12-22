'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import polyline from 'polyline';

import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';
import ActionCable from 'react-native-actioncable'

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, TouchableOpacity } from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import {  TouchableHighlight} from 'react-native';
import Modal from 'react-native-simple-modal';


import Form from 'react-native-form'

import { pushNewRoute } from '../../../actions/route';
import { createPickup } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';


import { Header, Content, Text, Button, Icon, Card, Title, InputGroup, Input, Thumbnail, CardItem,Container } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
const accessToken = 'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw';


import Mapbox from 'react-native-mapbox-gl';
Mapbox.setAccessToken(accessToken);
import { MapView } from 'react-native-mapbox-gl';

import styles from './styles';
import theme from '../../../themes/base-theme';


var { width, height } = Dimensions.get('window');
var Spinner = require('react-native-spinkit');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;



class InSession extends Component {



 


       
        static propTypes = {
    first_name: React.PropTypes.string,
   
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }
  pushNewRoute(route) {
         this.props.pushNewRoute(route);
       }
  



    constructor(props) {
        super(props);

       
        
          this.state = {
            spinnerVisible: true,

            message: '',
            open: false,
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

  drawRoute =(info) => {

    this._map && this._map.setVisibleCoordinateBounds(parseFloat(info.data.pickup_driver.driver_object.latitude), parseFloat(info.data.pickup_driver.driver_object.longitude), parseFloat(this.props.dropLatitude), parseFloat(this.props.dropLongitude), 100, 100, 100, 100);
    console.log("props lat and long",this.props.pickupLatitude,this.props.pickupLongitude);
    fetch('https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin='+parseFloat(info.data.pickup_driver.driver_object.latitude)+','+parseFloat(info.data.pickup_driver.driver_object.longitude)+'&destination=' + this.props.dropLatitude + ',' + this.props.dropLongitude +'&waypoints='+this.props.pickupLatitude+','+this.props.pickupLongitude+'&key=AIzaSyBIxUYPeN_bdWQMghHe2I62itZy2uzmm3c', {
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
                                                          coordinates: [parseFloat(info.data.pickup_driver.driver_object.latitude),parseFloat(info.data.pickup_driver.driver_object.longitude)],
                                                          type: 'point',
                                                          title: 'From:' ,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: info.data.pickup_driver.driver_object.drivers_license_image_thumb_url, // required. string. Either remote image URL or the name (without extension) of a bundled image
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
 setupSubscription = () => {

    this.setState({websocket: true});
    console.log("Render");
    console.log(this.props.first_name);

    var Recieving = (info) => {

      this.setState({spinnerVisible: false});
      console.log("accepted pickup", info);

      this.setState({fooditems: "allthefood"});

      this.setState({driver_name: info.data.pickup_driver.driver_object.first_name});
      this.setState({driver_image: info.data.pickup_driver.driver_object.drivers_license_image_thumb_url});
      this.setState({fromCoordinates: [parseFloat(info.data.pickup_driver.driver_object.latitude),parseFloat(info.data.pickup_driver.driver_object.longitude)]});
      this.setState({fromLatitude: parseFloat(info.data.pickup_driver.driver_object.latitude)});
      this.setState({fromLongtitude: parseFloat(info.data.pickup_driver.driver_object.longitude)});
      this.setState({center: {latitude: parseFloat(info.data.pickup_driver.driver_object.latitude), longitude: parseFloat(info.data.pickup_driver.driver_object.longitude)}});
      
      this.drawRoute(info);


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

    var App = {};
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
          console.log("connected to cable for insession");
              
        },

        received: function(data) {
      Recieving(data);

      
          

        },

       
      });
   }
  



 onFinishLoadingMap =  () => {
      

      if(!this.state.websocket){

  this.setupSubscription();
      }
}



    componentDidMount() {
      

       
       

     


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
                           </Button>
                           <Title>Wosyl Delivery</Title>
                       </Header>
            </View>

            { this.state.spinnerVisible &&
                <View style={{marginTop: 250, alignItems: 'center' }} >
                <Spinner  isVisible={true} size={100} type={'Circle'} color={"#3DA000"}/>
                 <Text style={{fontWeight: '600',color: '#fff', opacity: .99, marginTop:20}}>Looking For Driver</Text>

                </View>
            }
           

{this.state.open && 
                                <Container style={{marginTop:350}}>
                <Content>
                    <Card>
                        <CardItem style={{alignItems: 'center'}}>
                            
                            <Text>Driver Found: {this.state.driver_name}</Text>
                            
                        </CardItem>

                        <CardItem style={{alignItems: 'center'}}>
                            <Image style={{width: 150, height: 150, alignItems: 'center'}} source={{uri: this.state.driver_image}} />
                        </CardItem>

                        <CardItem>
                            <Grid>
                                                <Col style={{padding: 10}}>

                                                    <Button  style={{opacity: .99}}rounded onPress={() => this.AcceptOrder(true)} >

                                                      <Text style={{fontWeight: '600',color: '#fff', opacity: .99}}>Accept Delivery</Text>
                                                    </Button>
                                                </Col>
                                                <Col style={{padding: 10}}>
                                                  <Button style={{opacity: .99}} rounded onPress={() => this.AcceptOrder(false) } >

                                                      <Text style={{fontWeight: '600',color: '#fff', opacity: .99}}>Decline Delivery</Text>
                                                  </Button>
                                                </Col>
                                            </Grid>
                        </CardItem>
                   </Card>
                </Content>
            </Container>}


            <View style={styles.modalStyle}>
            </View>
            </View>
        )
    }
}
  


 



function mapStateToProps(state) {

    console.log("checkingInsessionPickss");
    console.log(state);
    if (state.route.pickup){

      console.log("Insession Picks Check5:");
      

      if(state.route.pickup.pickup){
        return {
      
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,
    pickupLatitude: state.route.pickup.pickup.from_latitude,
    pickupLongitude: state.route.pickup.pickup.from_longitude,
    dropLatitude: parseFloat(state.route.pickup.pickup.to_latitude),
    dropLongitude: parseFloat(state.route.pickup.pickup.to_longitude),
    pickupCoordinates: [parseFloat(state.route.pickup.pickup.from_latitude),parseFloat(state.route.pickup.pickup.from_longitude)],
    dropCoordinates: [parseFloat(state.route.pickup.pickup.to_latitude),parseFloat(state.route.pickup.pickup.to_longitude)],

    
        }
      }
    else{

      return {
      
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,
    pickupLatitude: state.route.pickup.fromLatitude,
    pickupLongitude: state.route.pickup.fromLongitude,
    dropLatitude: parseFloat(state.route.pickup.toLatitude),
    dropLongitude: parseFloat(state.route.pickup.toLongitude),
    pickupCoordinates: [parseFloat(state.route.pickup.fromLatitude),parseFloat(state.route.pickup.fromLongitude)],
    dropCoordinates: [parseFloat(state.route.pickup.toLatitude),parseFloat(state.route.pickup.toLongitude)],

    
        }



    }  
    }

    else
      return {
        first_name: 'nothing',
    last_name: "nothing",
    email: "nothing",
    phone_no: "nothing",
      }
}

function bindActions(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
      }
}




export default connect(mapStateToProps, bindActions)(InSession);
