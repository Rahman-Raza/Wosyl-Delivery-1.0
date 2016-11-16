'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Dimensions,Platform } from 'react-native';

import { replaceRoute } from '../../../actions/route';

import { Header, Content, Text, Button, Icon, Card, CardItem, Title, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
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
class RideBooked extends Component {
    
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
                latitude: 12.914000,
                longitude: 77.586034,
            },
            
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
                            }}
                            scrollEnabled={false}>
                            <MapView.Marker coordinate={this.state.b}>
                                <View>
                                    <Icon name='ios-car' style={{color: '#222',fontSize: 24}} />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.state.a}>
                                <View>
                                    <Icon name='ios-pin' />
                                </View>
                            </MapView.Marker>
                        </MapView>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={{height: height, opacity: this.state.opacity}}/> 
                        




                    <View style={styles.slideSelector}>
                    <Card>
                    <CardItem>
                        <Grid style={{flexDirection: 'row',borderWidth:0}}>
                            <Col style={styles.driverInfoContainer}>
                                <Thumbnail square size={60} source={require('../../../../images/Contacts/avatar-9.jpg')} style={{borderRadius: 30}} />
                                <View style={styles.driverInfo}>
                                    <Text style={{fontSize: 12,lineHeight: 13}}>4.5 </Text>
                                    <Icon name='ios-star' style={{fontSize: 12,marginTop: 0}} />
                                </View>
                                <Text>Mike Ross</Text>
                            </Col>
                            <Col style={styles.driverInfoContainer}>
                                <Icon name='ios-car' style={{fontSize: 40}} />
                                <View style={styles.carInfo}>
                                    <Text style={{fontSize: 12,lineHeight: 13}}>KA09CD007</Text>
                                </View>
                                <Text style={{fontSize: 12,lineHeight: 15}}>MARUTI SUZUKI</Text>
                                <Text style={{fontSize: 10,lineHeight: 12}}>SWIFT DZIRE</Text>
                            </Col>
                        </Grid>
                        </CardItem>
                        </Card>
                        

                        <Card style={{flexDirection: 'row',bottom: 5}}>
                            <CardItem style={styles.card}> 
                                <TouchableOpacity style={[ styles.btn,{flexDirection: 'row'}]}>
                                    <Icon name='ios-call-outline' style={{fontSize: 15,paddingHorizontal: 5}} />
                                    <Text style={styles.btnText}>CONTACT</Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={styles.card}>
                                <TouchableOpacity onPress={() => this.replaceRoute('home')} style={styles.btn} > 
                                    <Text style={styles.btnText}>CANCEL</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                        <Text style={styles.waitTime}>PICKUP TIME IS APPROXIMATELY 2 MINUTES</Text>
                    </View>
                  


                    <View style={styles.headerContainer}>
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.replaceRoute('home')} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title>En Route</Title>
                    </Header>
                    <View style={styles.srcdes}>
                        <Card style={styles.searchBar}>
                            <CardItem>
                                <Text style={styles.confirmation}>DRIVER CONFIRMED AND EN ROUTE</Text>
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
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(RideBooked);
