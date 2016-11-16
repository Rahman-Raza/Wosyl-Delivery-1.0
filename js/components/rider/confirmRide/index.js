'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Dimensions,Platform } from 'react-native';

import { pushNewRoute, replaceRoute } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';

import { Header, Content, Text, Button, Icon, Card, CardItem, Title, InputGroup, Input } from 'native-base';
import MapView from 'react-native-maps';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
class ConfirmRide extends Component {
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (
                <View style={{flex: 1}}>
                    <Content>
                    </Content>
                        {(this.state.visible) ?
                        (<MapView
                            ref='map'
                            style={styles.map}
                            initialRegion={{
                            latitude: LATITUDE,
                            longitude: LONGITUDE,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                            }}>
                            <MapView.Marker coordinate={this.state.b}>
                                <View>
                                    <Icon name='ios-car' style={styles.carIcon} />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.state.c}>
                                <View>
                                    <Icon name='ios-car' style={styles.carIcon} />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.state.d}>
                                <View>
                                    <Icon name='ios-car' style={styles.carIcon} />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.state.a}>
                                <View>
                                    <Icon name='ios-pin' style={{flex: 1,color: '#222'}} />
                                </View>
                            </MapView.Marker>
                        </MapView>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={{height: height, opacity: this.state.opacity}}/>



                    <View style={styles.slideSelector}>

                        <Card style={{flexDirection: 'row',bottom: 5}}>
                            <CardItem style={styles.selectCardContainer}>
                                <TouchableOpacity style={styles.selectCard}>
                                    <Text style={{fontSize: 13}}>FARE ESTIMATE</Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={styles.selectCardContainer}>
                                <TouchableOpacity style={[styles.selectCard,{flexDirection: 'row'}]} onPress={() => this.pushNewRoute('payment')}>
                                    <Image source={require('../../../../images/paytm2.png')} style={Platform.OS === 'ios' ? styles.iosPaytmIcon : styles.aPaytmIcon} />
                                    <Text style={{fontSize: 13}}>PAYTM</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>


                        <Button block style={{backgroundColor: '#19192B'}} onPress={() => this.pushNewRoute('rideBooked')}>
                            <Text style={{color: '#fff',fontWeight: '700'}}>REQUEST TAXI</Text>
                        </Button>

                        <Text style={styles.footerText}>PICKUP TIME IS APPROXIMATELY 2 MINUTES</Text>
                    </View>


                    <View style={{position: 'absolute',top: 0,width: width}}>
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader} >
                        <Button transparent  onPress={() => this.replaceRoute('home')} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title>Confirmation</Title>
                    </Header>
                    <View style={Platform.OS === 'ios' ? styles.iosSrcdes : styles.aSrcdes}>

                        <Card style={styles.searchBar}>
                            <CardItem>
                                <Icon name='ios-search' style={styles.searchIcon} />
                                <InputGroup borderType='regular' style={{borderWidth: 0}}>
                                    <Input placeholder='Source Required' placeholderTextColor='#797979' value={this.state.tripDetails.description} style={{textAlign: 'center',color: 'green'}}/>
                                </InputGroup>
                            </CardItem>
                        </Card>

                        <Card style={styles.searchBar}>
                            <CardItem>
                                <Icon name='ios-search' style={styles.searchIcon} />
                                <InputGroup borderType='regular' style={{borderWidth: 0}}>
                                    <Input placeholder='Destination Required' placeholderTextColor='#797979' style={{textAlign: 'center'}}/>
                                </InputGroup>
                            </CardItem>
                        </Card>

                    </View>
                    </View>



                </View>
        )
    }
}


function bindActions(dispatch){
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(ConfirmRide);
