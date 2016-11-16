'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity,Platform,Dimensions } from 'react-native';

import { replaceRoute, popRoute } from '../../../actions/route';

import {Container, Header, Content, Text, Button, Icon,Thumbnail, Card, CardItem } from 'native-base';
import MapView from 'react-native-maps';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = 0.0722;
const SPACE = 0.01;
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            visible: false,
            a: {
                latitude: LATITUDE ,
                longitude: LONGITUDE,
            }
        };
    }
    componentDidMount() {
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
    }
    
    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >

                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Select a trip</Text>

                    </Header>
                    <Content style={{backgroundColor: '#eee'}}>
                        <View style={{padding: 15}}>
                            <Card style={{position:'relative'}}>
                                <CardItem style={styles.mapContainer}>
                                    {(this.state.visible) ?
                                    (<MapView
                                    style={{height: height/2, top: -10}}
                                    initialRegion={{
                                    latitude: 11.920614,
                                    longitude: 77.586234,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                    scrollEnabled={false}>
                                </MapView>)
                                : <View />
                                }

                                <Image source={require('../../../../images/dummyMap.png')} style={{ resizeMode: 'cover', opacity: this.state.opacity}}/>

                                </CardItem>
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={require('../../../../images/Contacts/avatar-1.jpg')} size={40} style={styles.driverImage} />
                                    <Text>Monday at 10:30 am</Text>
                                    <Text note>Maruti Suzuki Ritz</Text>
                                    <Text style={styles.cashText}><Text style={{color: 'green'}}>CASH</Text> $2</Text>
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                        </View>

                        <View style={{padding: 15,paddingTop: 0}}>
                            <Card style={{position:'relative'}}>
                                <CardItem style={styles.mapContainer}>
                                    {(this.state.visible) ?
                                    (<MapView
                                    style={{height: height/2, top: -10}}
                                    initialRegion={{
                                    latitude: 12.920614,
                                    longitude: 77.586234,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                    scrollEnabled={false}>
                                </MapView>)
                                : <View />
                                }

                                <Image source={require('../../../../images/dummyMap.png')} style={{ resizeMode: 'cover', opacity: this.state.opacity}}/>

                                </CardItem>
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={require('../../../../images/Contacts/avatar-2.jpg')} size={40} style={styles.driverImage} />
                                    <Text>20/7/2016 at 10.01 am</Text>
                                    <Text note>Tata Indica</Text>
                                    <Text style={styles.cashText}><Text style={{color: 'green'}}>CASH</Text> $3</Text>
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                        </View>

                        <View style={{padding: 15,paddingTop: 0}}>
                            <Card style={{position:'relative'}}>
                                <CardItem style={styles.mapContainer}>
                                    {(this.state.visible) ?
                                    (<MapView
                                    style={{height: height/2, top: -10}}
                                    initialRegion={{
                                    latitude: 12.920614,
                                    longitude: 79.586234,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                    scrollEnabled={false}>
                                </MapView>)
                                : <View />
                                }

                                <Image source={require('../../../../images/dummyMap.png')} style={{ resizeMode: 'cover', opacity: this.state.opacity}}/>

                                </CardItem>
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={require('../../../../images/Contacts/avatar-3.jpg')} size={40} style={styles.driverImage} />
                                    <Text>15/6/2016 at 1.43 pm</Text>
                                    <Text note>Maruti Swift Dzire</Text>
                                    <Text style={styles.cashText}><Text style={{color: 'green'}}>CASH</Text> $7</Text>
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                        </View>

                        <View style={{padding: 15,paddingTop: 0}}>
                            <Card style={{position:'relative'}}>
                                <CardItem style={styles.mapContainer}>
                                    {(this.state.visible) ?
                                    (<MapView
                                    style={{height: height/2, top: -10}}
                                    initialRegion={{
                                    latitude: 52.469397,
                                    longitude: 5.509644,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                    scrollEnabled={false}>
                                </MapView>)
                                : <View />
                                }

                                <Image source={require('../../../../images/dummyMap.png')} style={{ resizeMode: 'cover', opacity: this.state.opacity}}/>

                                </CardItem>
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={require('../../../../images/Contacts/avatar-4.jpg')} size={40} style={styles.driverImage} />
                                    <Text>30/5/2016 at 5:54 pm</Text>
                                    <Text note>Tata Indigo</Text>
                                    <Text style={styles.cashText}><Text style={{color: 'green'}}>CASH</Text> $1</Text>
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                        </View>

                        <View style={{padding: 15,paddingTop: 0}}>
                            <Card style={{position:'relative'}}>
                                <CardItem style={styles.mapContainer}>
                                    {(this.state.visible) ?
                                    (<MapView
                                    style={{height: height/2, top: -10}}
                                    initialRegion={{
                                    latitude: LATITUDE,
                                    longitude: LONGITUDE,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                    scrollEnabled={false}>
                                </MapView>)
                                : <View />
                                }

                                <Image source={require('../../../../images/dummyMap.png')} style={{ resizeMode: 'cover', opacity: this.state.opacity}}/>

                                </CardItem>
                                 <CardItem style={styles.detailContainer}>
                                    <Thumbnail square source={require('../../../../images/Contacts/avatar-5.jpg')} size={40} style={styles.driverImage} />
                                    <Text>25/5/2016 at 10:01 pm</Text>
                                    <Text note>Tata Indica</Text>
                                    <Text style={styles.cashText}><Text style={{color: 'green'}}>CASH</Text> $2</Text>
                                </CardItem>
                                <View style={styles.dummyView} />
                            </Card>

                        </View>
                    </Content>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(History);
