'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform,  ProgressViewIOS, DeviceEventEmitter} from 'react-native';

import { popRoute,replaceRoute} from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input, Content, Title} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import { createPickup } from '../../../actions/route';
const accessToken = 'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw';

import Mapbox from 'react-native-mapbox-gl';
Mapbox.setAccessToken(accessToken);
import { MapView } from 'react-native-mapbox-gl';
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;




import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createPickup: (route,pickup) =>dispatch(createPickup(route,pickup)),
    }
}
function mapStateToProps(state) {

    console.log("checkingpickupset");
    console.log(state);
    if (state.route.pickup){
      

        return {

          toLocation: state.route.pickup.toLocation,
          toLatitude: state.route.pickup.toLatitude,
          toLongtitude: state.route.pickup.toLongtitude,
          fromLocation: state.route.pickup.fromLocation,
          fromLatitude: state.route.pickup.fromLatitude,
          fromLongtitude: state.route.pickup.fromLongtitude,
          overview_polyline: state.route.pickup.overview_polyline,
          userDetail: state.route.users,
          center: {
      latitude: parseFloat(state.route.pickup.toLatitude),
      longitude: parseFloat(state.route.pickup.toLongtitude)
    },
    fromCoordinates: [parseFloat(state.route.pickup.fromLatitude),parseFloat(state.route.pickup.fromLongtitude) ],
    toCoordinates: [parseFloat(state.route.pickup.toLatitude),parseFloat(state.route.pickup.toLongtitude) ],
          

      }

    

    
  }

    else{
      return{

        toLocation: 'empty',
          fromLocation: 'empty',
          itemPickup: 'empty',
          notes: 'empty',

      }
    }

}

class CreatePickup extends Component {
    constructor(props) {
      super(props);

      this.state ={
          behavior: 'padding',
          visiblePadding: 0,
        progress: 0.5,
        open: false,
        phone_code: '',
      fromLocation: '',
      toLocation: '',
      itemPickup: '',
      notes: '',
      selectedSupportedOrientation: 0,
      zoom: 15,
    userTrackingMode: Mapbox.userTrackingMode.none,
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
            },

            annotations: [{
                                                          coordinates: this.props.fromCoordinates,
                                                          type: 'point',
                                                          title: 'From:' + this.props.fromLocation,
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
                                                          coordinates: this.props.toCoordinates,
                                                          type: 'point',
                                                          title: 'To:' + this.props.toLocation,
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
                                                          coordinates: this.props.overview_polyline,
                                                          type: 'polyline',
                                                          strokeColor: '#00FB00',
                                                          strokeWidth: 5,
                                                          strokeAlpha: 1,
                                                          id: 'foobar'
                                                        }




                                                        ]

     
    };
    }
    popRoute() {

        this.props.popRoute();
    }


    createPickup(){

        

    var pickupItem = {"toLocation" : this.props.toLocation, "toLatitude": this.props.toLatitude, "toLongtitude" : this.props.toLongtitude, 
    "fromLocation" : this.props.fromLocation,"fromLatitude": this.props.fromLatitude, "fromLongtitude" : this.props.fromLongtitude, "notes" : this.state.notes, "itemPickup" : this.state.itemPickup};
    this.props.createPickup('placeOrder',pickupItem);
  }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 

 

    getInitialState() {
    return {
      mapLocation: {
        latitude: 0,
        longitude: 0
       },
       center: {
         latitude: this.props.fromLatitude,
         longitude: parseInt(this.props.fromLongtitude)
       },
       annotations: [{
         latitude: 40.72052634,
         longitude:  -73.97686958312988,
         title: 'This is marker 1',
         subtitle: 'Hi mom!'
       },{
         latitude: 40.714541341726175,
         longitude:  -74.00579452514648,
         title: 'This is marker 2',
         subtitle: 'Neat, this is a subtitle'
       }],
       zoom: 10,
       direction: 0
     }
  }

   
  onChange(e) {
    this.setState({ mapLocation: e });
  }

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    console.log('onUpdateUserLocation', location);
  };
  onOpenAnnotation = (annotation) => {

    if (annotation.id == 'marker1'){
      this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(this.props.fromLatitude), parseFloat(this.props.fromLongtitude),13);
    }
    else if (annotation.id == 'marker2'){
      this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(this.props.toLatitude), parseFloat(this.props.toLongtitude),13);
    }
    console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
  };
  onTap = (location) => {
    console.log('onTap', location);
  };
  onChangeUserTrackingMode = (userTrackingMode) => {
    this.setState({ userTrackingMode });
    console.log('onChangeUserTrackingMode', userTrackingMode);
  };

  onFinishLoadingMap =  () => {
this._map && this._map.setVisibleCoordinateBounds(parseFloat(this.props.fromLatitude), parseFloat(this.props.fromLongtitude), parseFloat(this.props.toLatitude), parseFloat(this.props.toLongtitude), 200,50,200,50);
  };

  onStartLoadingMap = () =>{
//     this._map && this._map.addSource("route", {
//         "type": "geojson",
//         "data": {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [parseFloat(this.props.fromLatitude), parseFloat(this.props.fromLongtitude)],
//                     [parseFloat(this.props.toLatitude), parseFloat(this.props.toLongtitude)]
                    
//                 ]
//             }
//         }
//     });

// this._map && this._map.addLayer({
//         "id": "route",
//         "type": "line",
//         "source": "route",
//         "layout": {
//             "line-join": "round",
//             "line-cap": "round"
//         },
//         "paint": {
//             "line-color": "#888",
//             "line-width": 8
//         }
//     });

  };

  componentWillMount() {
    
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      console.log('offline pack progress', progress);
    });
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
      console.log('offline max allowed tiles', tiles);
    });
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      console.log('offline error', error);
    });

     DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

   keyboardWillShow (e) {
    
    this.setState({visiblePadding: 200})
  }

  keyboardWillHide (e) {
    this.setState({visiblePadding: 0})
  }


  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
    this._offlineMaxTilesSubscription.remove();
    this._offlineErrorSubscription.remove();
  }

   


    onDidFocus(){
        console.log('done');
    }
    
    
    render() {

      console.log("checking props.center");
      console.log(this.props.center);
        return (
                <View style={styles.container}>
                  <StatusBar barStyle='light-content' />
                  <Content theme={theme}>
                  </Content>

                  <View style={styles.map}>
                        {(this.state.visible) ?
                        <MapView  ref={map => { this._map = map; }}
          style={styles.map}
          styleURL={Mapbox.mapStyles.dark}
          
          initialCenterCoordinate={this.props.center}
          initialZoomLevel={10}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onFinishLoadingMap = {this.onFinishLoadingMap}
          onStartLoadingMap = {this.onStartLoadingMap}
          onLongPress={this.onLongPress}
          onTap={this.onTap}/>
                        : <View />
                        }
                    </View>
                    
                  <View style={styles.headerContainer}>
                       <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28,color: 'white'}} />
                        </Button>
                        <Title style={{marginTop:15, marginRight:10,color:'white'}}> <Text style={styles.iosHeaderTitle}>What item would you like Delivered? </Text></Title>
                    </Header>
                    
                     </View>
        
                  
                     <View style={styles.modalStyle}>
               
                       
               
                     
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
                          <Button rounded  block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => {this.createPickup()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Next</Text>
                          </Button>
                        </View>
                        
                     </View>
                 
                </View>
                



                
        )
    }


       componentDidMount() {
       
    
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

    componentDidUpdate(){
      


    }
}







export default connect(mapStateToProps, bindActions)(CreatePickup);
