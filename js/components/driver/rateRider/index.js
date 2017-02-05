'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Dimensions, Modal,Platform,StatusBar } from 'react-native';

import { popRoute } from '../../../actions/route';

import { Header, Content, Text, Button, Icon, Card, CardItem } from 'native-base';
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
class RateRider extends Component {
    popRoute() {
        this.props.popRoute();
    }
    constructor(props) {
        super(props);
        this.state = {
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
            
        };
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
     setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    render() {
        return (
                <View style={this.state.modalVisible === true ? {opacity: 0.5,flex: 1} : {flex: 1}}>
                    <StatusBar barStyle='light-content' />
                    <Content>
                    </Content>
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
                            direction={this.state.direction}/>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={{height: height, opacity: this.state.opacity}}/> 
                        




                    <View style={styles.slideSelector}>
                        <Card style={styles.footerCard}>
                            <CardItem>
                                <Text style={styles.trip}>LAST TRIP</Text>
                                <Text note style={styles.pay}>$12.05</Text>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center'}}> 
                                <Button style={styles.helpBtn} bordered >
                                    <Text style={{color: '#000',fontSize: 14,lineHeight: 16}}>NEED HELP?</Text>
                                </Button>
                            </CardItem>
                        </Card>
                        <Card style={styles.footerCard}>
                            <CardItem>
                                <Text>JOE</Text>
                                <Text note>Hyundai Xcent</Text>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center'}}>
                                <Text style={{textAlign: 'right',color: '#000'}}>4.9 <Icon name='ios-star' style={styles.starIcon} /></Text>
                            </CardItem>
                        </Card>
    
                    </View>
                    



                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()}>
                            <Icon name='md-arrow-back' style={{color: '#fff',fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>TAXI</Text>
                        
                    </Header>
                    
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert('Modal has been closed.')}}
                        >
                        <View style={styles.modalView}>
                            <Card style={styles.rateCard}>
                                <CardItem style={{borderColor: '#eee'}}>
                                    <Icon name='ios-person' style={styles.profileIcon} />
                                    <Text style={{color: '#31D0E2',fontSize: 13,fontWeight: '700',lineHeight: 14}}>RATE</Text>
                                    <Text note style={{fontSize: 18,fontWeight: '500',color: '#333'}}>Joe</Text>
                                </CardItem>
                            </Card>
                            <Card style={{borderRadius: 0,borderColor: '#eee'}}>
                                <CardItem style={styles.ratings}>  
                                        <Icon name='ios-star' style={{letterSpacing: 10,color: '#797979'}} />
                                        <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                        <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                        <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                        <Icon name='ios-star'style={{color: '#797979'}} />
                                </CardItem>
                                <CardItem style={styles.btnContainer}>
                                    <Button block style={{backgroundColor: '#31D0E2',height: 60}}  onPress={() => {this.setModalVisible(false)}} >
                                        <Text style={styles.btnText}>COMPLETE RATING</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        </View>
                    </Modal>



                </View>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(RateRider);
