'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity,Platform,Dimensions } from 'react-native';
import polyline from 'polyline';

import { replaceRoute, popRoute } from '../../../actions/route';

import {Container, Header, Content, Text, Button, Icon,Thumbnail, Card, CardItem, Title } from 'native-base';


import styles from './styles';
import theme from '../../../themes/base-theme';

const accessToken = 'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw';

import Mapbox from 'react-native-mapbox-gl';
Mapbox.setAccessToken(accessToken);
import { MapView } from 'react-native-mapbox-gl';
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = 0.0722;
const SPACE = 0.01;

import {
   AppRegistry,
   
} from 'react-native';
class History extends Component {
    constructor(props) {
        super(props);
        var ordersArray = [];
        var overview_polyline_list = [];
        var dropoffCoords = [];
        var pickupCoords = [];
        var maps = [];
        var annotations = [];

        this.map = [];
        for (var i = 0; i < 10; i++){
          this.map[i] = [];
        }

        
        this.state = {
          
          annotations: annotations,
          first: false,
          second: false,
          third: false,
          fourth: false,
          fifth: false,
          mapCount : 0,
          maps : maps,
          loadedPickups: false,
          dropoffCoords: dropoffCoords,
          pickupCoords: pickupCoords,
            pickupsExist: false,
            overview_polyline_list : overview_polyline_list,
            fetchedData: false,
            ordersArray: ordersArray,
            region: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            opacity: 1,
            visible: true,
            a: {
                latitude: LATITUDE ,
                longitude: LONGITUDE,
            }
        };
    }

    drawRoute = (data, mapIndex) => {
      console.log("checking routeDATA", data);
        fetch('https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin='+data.from_latitude + ','+data.from_longitude+'&destination=' + data.to_latitude + ',' + data.to_longitude + '&key=AIzaSyBXhAMu9OsUdANNfR-lV00P5aQHoPfqF4M', {
                                                      method: 'POST',
                                                      headers: {
                                                       
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            if (responseJson.status = 'OK'){
                                                              console.log("checking response ok",responseJson);
                                                              console.log(responseJson.routes[0].overview_polyline.points);
                                                              var overview_polyline = polyline.decode(responseJson.routes[0].overview_polyline.points);
                                                              

                                                              this.map[mapIndex].setVisibleCoordinateBounds(parseFloat(data.from_latitude), parseFloat(data.from_longitude), parseFloat(data.to_latitude), parseFloat(data.to_longitude), 100, 100, 100, 100);
                                                              var anot = this.state.annotations;

                                                              anot.push( [{
                                                          coordinates: [ 
                                                                                             parseFloat(data.from_latitude),
                                                                                               parseFloat(data.from_longitude),
                                                                                            ],
                                                          type: 'point',
                                                          title: 'From:', 
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a7ae8dc81.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 100, // required. number. Image height
                                                                width: 60, // required. number. Image width
                                                              },
                                                          id: 'marker1'
                                                        },
                                                        {
                                                          coordinates: [
                                                                                            parseFloat( data.to_latitude),
                                                                                              parseFloat(data.to_longitude),
                                                                                            ],
                                                          type: 'point',
                                                          title: 'To:', 
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
                                                          id: 'marker2'
                                                        },
                                                        {
                                                          coordinates: overview_polyline,
                                                          type: 'polyline',
                                                          strokeColor: '#00FB00',
                                                          strokeWidth: 5,
                                                          strokeAlpha: 1,
                                                          id: 'foobar'
                                                        } ]);
                                                          this.setState({annotations: anot});

                                                          if (mapIndex == 1){
                                                            console.log("checking anots",anot);
                                                          }
                                                        
                                                                   





                                                                   

                                                                   

                                                                     

                                                                    
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
                visible: true
            });
        }, 900);
        setTimeout(function () {
            that.setState({
                opacity : 0
            });
        }, 3050);

this.setMapZoom();

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
  CancelOrder = () => {
    this.setState({spinnerVisible: false});
    this.props.replaceOrPushRoute('home');
  }

    componentWillMount(){

        if (!this.state.fetchedData){
            fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/completed_pickup_list.json', {
                                                      method: 'GET',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for fetch data",responseJson);
                                                            
                                                            
                                                            if (responseJson.success){
                                                                console.log("json worked for fetch data22");
                                                                

                                                                
                                                              
                                                                console.log("doing blahhh");
                                                              this.setState({orderCount: 10});
                                                              
                                                                this.setState({ordersArray: responseJson.pickups});
                                                                console.log("length of pickups",responseJson.pickups.length);
                                                                                                                              
                                                               for (var j = 0; j <= responseJson.pickups.length; j++){

                                                                if (j == 1){
                                                                  this.setState({first: true});
                                                                }

                                                                if (j == 2){
                                                                  console.log("second true");
                                                                  this.setState({second: true});
                                                                }

                                                                if (j == 3) {
                                                                  this.setState({third: true});
                                                                }

                                                                if (j == 4) {
                                                                  this.setState({fourth: true});
                                                                }

                                                                if (j == 5) {
                                                                  this.setState({fifth: true});
                                                                  break;
                                                                }



                                                               }


                                                               console.log("checking orders array 1 ", this.state.ordersArray);
                                                              this.setState({processedData: true});
                                                              console.log("checking pickups length",responseJson.pickups.length );
                                                                
                                                                
                                                                
                                                                if (responseJson.pickups[0]){
                                                                    this.setState({pickupsExist: true});

                                                                }

                                                              
                                                              
                                                               
                                                                 
                                                            }

                                                            else{
                                                              this.setState({open: true});
                                                                
                                                                 
                                                             

                                                            }
                                                          });

            this.setState({fetchedData: true});
        }
    }

    onRegionChange(region) {
  this.setState({ region: reg });
}
    
    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    onMapLoaded = () =>{
        var pickup = 
          { success: true,
            pickup: 
             { id: 447,
               customer: 
                { id: 20,
                  first_name: 'John',
                  last_name: 'Roby',
                  email: 'jr@wosyl.com',
                  phone_no: '+12345678899',
                  access_token: 'TCTnvNcqYzUHOfIsWMWi',
                  is_phone_verified: true,
                  is_activated: false,
                  latitude: 38.5404302,
                  longitude: -121.7232103 },
               pickup_from: 'San Jose',
               pickup_to: 'San Francisco',
               from_latitude: 37.3382082,
               from_longitude: -121.8863286,
               to_latitude: 37.7749295,
               to_longitude: -122.4194155,
               item: 'Food items',
               notes: 'N/A',
               is_started: false,
               is_completed: false,
               is_expired: false,
               item_pickedup: false,
               driver: null } }

               this.setState({ center: {
         latitude: pickup.pickup.from_latitude,
         longitude: pickup.pickup.from_longitude
       } })

               this.setState({pickup: pickup});








    }
    setMapZoom = () =>{

      console.log("checking polyList", this.state.overview_polyline_list[0]);
      
      
      
    }

    loadPickups = () => {
     
      for (var i = 0; i < this.state.ordersArray.length; i++){

                                                                  
                                                                this.drawRoute(this.state.ordersArray[i],i);

                                                                if (i == 4){
                                                                  console.log("breaking now");
                                                                  break;
                                                                }

                                                              }
    }

onFinishLoadingMap = () =>{
console.log("map did");
}
render() {
  
       if (this.state.processedData){ return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >

                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Select a trip</Title>

                    </Header>
                    <Content style={{backgroundColor: '#eee',marginBottom: (Platform.OS === 'ios') ? -50 : -10}}>{ this.state.pickupsExist &&
                        <View style={{padding: 15}}>

                       <Card style={{position:'relative'}}>
                                
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={{uri: this.state.ordersArray[0].driver.drivers_license_image_thumb_url}} size={40} style={styles.driverImage} />
                                    
                                    <Text note style={{}}>From : {this.state.ordersArray[0].pickup_from}</Text>
                                    <Text note style={{}}>To : {this.state.ordersArray[0].pickup_to}</Text>
                                    <Text note style={{}}>Item : {this.state.ordersArray[0].item}</Text>
                                    <Text note style={{}}>Notes : {this.state.ordersArray[0].notes}</Text>

                                  
                                
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                         

                            

                        </View>




                      }{ this.state.second &&
                        <View style={{padding: 15}}>

                       <Card style={{position:'relative'}}>
                               
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={{uri: this.state.ordersArray[1].driver.drivers_license_image_thumb_url}} size={40} style={styles.driverImage} />
                                    
                                    <Text note style={{}}>From : {this.state.ordersArray[1].pickup_from}</Text>
                                    <Text note style={{}}>To : {this.state.ordersArray[1].pickup_to}</Text>
                                    <Text note style={{}}>Item : {this.state.ordersArray[1].item}</Text>
                                    <Text note style={{}}>Notes : {this.state.ordersArray[1].notes}</Text>

                                  
                                
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                         

                            

                        </View>




                      }{ this.state.third &&
                        <View style={{padding: 15}}>

                       <Card style={{position:'relative'}}>
                               
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={{uri: this.state.ordersArray[2].driver.drivers_license_image_thumb_url}} size={40} style={styles.driverImage} />
                                    
                                    <Text note style={{}}>From : {this.state.ordersArray[2].pickup_from}</Text>
                                    <Text note style={{}}>To : {this.state.ordersArray[2].pickup_to}</Text>
                                    <Text note style={{}}>Item : {this.state.ordersArray[2].item}</Text>
                                    <Text note style={{}}>Notes : {this.state.ordersArray[2].notes}</Text>

                                  
                                
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                         

                            

                        </View>




                      }{ this.state.fourth &&
                        <View style={{padding: 15}}>

                       <Card style={{position:'relative'}}>
                               
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={{uri: this.state.ordersArray[3].driver.drivers_license_image_thumb_url}} size={40} style={styles.driverImage} />
                                    
                                    <Text note style={{}}>From : {this.state.ordersArray[3].pickup_from}</Text>
                                    <Text note style={{}}>To : {this.state.ordersArray[3].pickup_to}</Text>
                                    <Text note style={{}}>Item : {this.state.ordersArray[3].item}</Text>
                                    <Text note style={{}}>Notes : {this.state.ordersArray[3].notes}</Text>

                                  
                                
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                         

                            

                        </View>




                      }{ this.state.fifth &&
                        <View style={{padding: 15}}>

                       <Card style={{position:'relative'}}>
                                
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={{uri: this.state.ordersArray[4].driver.drivers_license_image_thumb_url}} size={40} style={styles.driverImage} />
                                    
                                    <Text note style={{}}>From : {this.state.ordersArray[4].pickup_from}</Text>
                                    <Text note style={{}}>To : {this.state.ordersArray[4].pickup_to}</Text>
                                    <Text note style={{}}>Item : {this.state.ordersArray[4].item}</Text>
                                    <Text note style={{}}>Notes : {this.state.ordersArray[4].notes}</Text>

                                  
                                
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                         

                            

                        </View>




                      }</Content>
                </Container>
        )}
        else{
          return ( <Container theme={theme} style={{backgroundColor: '#fff'}} >

                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Select a trip</Title>

                    </Header>
                    <Content style={{backgroundColor: '#eee',marginBottom: (Platform.OS === 'ios') ? -50 : -10}}>
                    <View></View>
                    </Content>
                    </Container>




                    )
        }
      
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute: () => dispatch(popRoute())
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

export default connect(mapStateToProps, bindActions)(History);
