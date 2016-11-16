'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Dimensions,TouchableWithoutFeedback,StatusBar,Platform } from 'react-native';

import { replaceRoute } from '../../../actions/route';

import { Content, Text, Icon,Header } from 'native-base';
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
class RideRequest extends Component {
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
                latitude: 12.900000,
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
            <TouchableWithoutFeedback style={styles.pageTouch} onPress={() => this.replaceRoute('pickRider')} >
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />

                    <Content theme={theme}>


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
                                    <Icon name='ios-pin'  />
                                </View>
                            </MapView.Marker>

                        </MapView>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={{height: height, opacity: this.state.opacity}}/>

                    <Image source={require('../../../../images/map-bg.png')} style={styles.mapBg} >


                        

                            <View style={styles.detailsContainer}>

                                <Text style={styles.time}>3 MINUTES</Text>
                                <Text style={styles.place}>
                                6, 39th Cross Rd, 4th T Block East,  Jayanagara, Bengaluru, Karnataka 560041</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.rating}>4.6 </Text>
                                    <Icon name='ios-star' style={Platform.OS === 'ios' ? styles.iosRateStar : styles.aRateStar } />
                                </View>
                            </View>
                        </Image>


                        <Header  style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}>

                            <Text  style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>Taxi</Text>

                        </Header>
                </View>
                    </TouchableWithoutFeedback>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(RideRequest);
