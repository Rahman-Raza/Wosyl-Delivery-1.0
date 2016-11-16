'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Dimensions, Modal,Platform,StatusBar } from 'react-native';

import { replaceRoute } from '../../../actions/route';

import { Header, Content, Text, Button, Icon, Card, CardItem } from 'native-base';
import MapView from 'react-native-maps';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.1722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
class DropOff extends Component {
    
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    constructor(props) {
        super(props);
        this.state = {
            a: {
                latitude: 12.910000,
                longitude: LONGITUDE,
            },
            b: {
                latitude: 12.904000,
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
                    <StatusBar barStyle='light-content' />
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
                            <MapView.Marker coordinate={this.state.b}>
                                <View  style={{top: -20}}>
                                    <Icon name='ios-pin' style={[Platform.OS === 'ios' ? {} : {marginTop: 20} , {alignSelf: 'center',color: '#C61100',flex: 1}]} />
                                </View>
                            </MapView.Marker>
                        </MapView>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={[Platform.OS === 'ios' ? {height: height} : {height: height}, {opacity: this.state.opacity}]}/>
                        




                    <View style={styles.slideSelector}>
                        <Card style={{flexDirection: 'row',backgroundColor: '#eee'}}>
                            <CardItem>
                                <Icon name='ios-person' style={{alignSelf: 'center',paddingRight: 10,color: '#797979'}} />
                                <Text style={{color: '#C61100',fontSize: 13,fontWeight: '700',lineHeight: 14}}>DROP OFF</Text>
                                <Text note style={{fontSize: 18,fontWeight: '500',color: '#333'}}>Joe</Text>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center'}}> 
                                <Text style={{textAlign: 'right',color: '#797979'}}>13 min</Text>
                            </CardItem>
                        </Card>
                        <Card>
                           
                            <CardItem style={{borderTopWidth: 1}}>
                                <Button block style={styles.tripBtn} onPress={() => this.replaceRoute('rateRider')} >
                                    <Text style={styles.btnText}>COMPLETE TRIP</Text>
                                </Button>
                            </CardItem>
                        </Card>
    
                    </View>
                    
                    <View style={styles.headerContainer}>
                        <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                                 
                                <Text  style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>ON TRIP</Text>
                                
                        </Header>
                        <View style={Platform.OS === 'ios' ? styles.iosSrcdes : styles.aSrcdes}>
                                <View style={styles.place}>
                                    <Text style={styles.placeText}>6, 39th Cross Rd, 4th T Block East,  Jayanagara, Bengaluru, Karnataka 560041</Text>
                                </View>
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

export default connect(null, bindActions)(DropOff);
