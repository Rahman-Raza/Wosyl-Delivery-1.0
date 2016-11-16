'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Dimensions, Modal,Platform,StatusBar } from 'react-native';

import { replaceRoute,popRoute } from '../../../actions/route';

import { Header, Content, Text, Button, Icon, Card, CardItem } from 'native-base';
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
class StartRide extends Component {
    
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    popRoute() {
        this.props.popRoute();
    }
    constructor(props) {
        super(props);
        this.state = {
            a: {
                latitude: 12.927000,
                longitude: LONGITUDE,
            },
            b: {
                latitude: 12.904000,
                longitude: 77.586034,
            },
            modalVisible : false,
            
        };
    }
     setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
                            <MapView.Marker coordinate={this.state.a}>
                                <View>
                                    <Icon name='ios-car' style={{color: '#222',fontSize: 24}} />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.state.a}>
                                <View  style={{top: -20}}>
                                    <Icon name='ios-pin' style={[Platform.OS === 'ios' ? {} : {marginTop: 20} , {alignSelf: 'center',color: 'green',flex: 1}]} />
                                </View>
                            </MapView.Marker>
                        </MapView>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={[Platform.OS === 'ios' ? {height: height} : {height: height}, {opacity: this.state.opacity}]}/> 
                        




                    <View style={styles.slideSelector}>
                        <Card style={styles.pickCard}>
                            <CardItem>
                                <Icon name='ios-person' style={styles.profileIcon} />
                                <Text style={{color: 'green',fontSize: 13,fontWeight: '700',lineHeight: 14}}>PICK UP</Text>
                                <Text note style={{fontSize: 18,fontWeight: '500',color: '#333'}}>Joe</Text>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center'}}> 
                                <Text style={{textAlign: 'right',color: '#797979'}}>0 MIN</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem style={{alignSelf: 'center',borderBottomWidth: 0}}>
                                <Icon name='md-alarm'style={{color: '#797979'}} />
                                <Text style={{color: '#555',fontWeight: '700'}}>WAIT FOR RIDER</Text>
                                <Text note>Rider has been notified</Text>
                            </CardItem>
                            <CardItem style={{borderTopWidth: 1}}>
                                <Button  onPress={() => this.replaceRoute('dropOff')} block style={styles.tripBtn} >
                                    <Text style={styles.btnText}>START TRIP</Text>
                                </Button>
                            </CardItem>
                        </Card>
    
                    </View>


                    
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert('Modal has been closed.')}}
                    >
                        <View style={{height: height,backgroundColor: '#19192B'}}>
                          <Header  style={[{backgroundColor: '#19192B'},Platform.OS === 'ios' ? {} : styles.modalHeader]}>
                            <Button transparent style={{justifyContent: 'center'}} onPress={() => {this.setModalVisible(false)}}>
                                <Icon name='ios-close' style={styles.close} />
                            </Button>
                            <Text  style={Platform.OS === 'ios' ? styles.iosTitle : styles.aTitle}>CURRENT TRIPS</Text>
                            <Button transparent>
                                <Text  style={Platform.OS === 'ios' ? styles.iosHeaderText : styles.aHeaderText }>WAYBILL</Text>
                            </Button>
                          </Header>


                          <Content style={styles.modalContainer}>
                          <View style={{paddingVertical: 30,paddingHorizontal: 10}}>
                            <Text style={styles.containHead}>NEXT STOP</Text>
                            <Card>
                                <CardItem>
                                    <View>
                                        <Text style={{color: 'green',fontSize: 13,lineHeight: 15}}>PICK UP</Text>
                                        <Text note style={{fontSize: 20,lineHeight:22}}>Joe</Text>
                                    </View>
                                    <View style={{alignSelf: 'flex-end'}}>
                                        <Icon name='ios-person' style={{marginTop: -40,color: '#797979'}}  />
                                    </View>
                                </CardItem>
                                <TouchableOpacity >
                                    <CardItem>
                                        <Text style={{fontSize: 20,color: '#797979',lineHeight:25}}>Taxi</Text>
                                    </CardItem>
                                </TouchableOpacity>
                                <CardItem style={{flexDirection: 'row',padding: 0}}>
                                    <Grid>
                                        <Col>
                                            <TouchableOpacity>
                                                <CardItem style={[styles.btnContain,{borderRightWidth: 1}]}>
                                                    <Icon name='ios-chatboxes' style={{color: '#3EC1D9'}} />
                                                    <Text style={{color: '#3EC1D9'}}>CONTACT</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity>
                                                <CardItem style={styles.btnContain}>
                                                    <Icon name='ios-close-circle-outline' style={{color: '#3EC1D9'}} />
                                                    <Text style={{color:'#3EC1D9'}}>CANCEL</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </CardItem>
                            </Card>
                          </View>


                          <View style={{paddingVertical: 30,paddingHorizontal: 10}}>
                          <Text style={styles.containHead}>UPCOMING STOP</Text>
                            <Card>
                                <CardItem>
                                    <Icon name='ios-person' style={{alignSelf: 'center',color: '#797979'}}/>
                                    <Text style={styles.drop}>DROP OFF</Text>
                                    <Text note style={{textAlign: 'right',alignSelf: 'flex-end',fontSize: 18}}>Joe</Text>
                                </CardItem>
                            </Card>
                          </View>
                        </Content>
                        </View>
                    </Modal>


                    <View style={styles.headerContainer}>
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28,color: '#fff'}} />
                        </Button>
                        <Text  style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>ON TRIP</Text>
                        <Button transparent  onPress={() => {
                                this.setModalVisible(true)
                            }}>
                            <Icon name='ios-list' style={{color: '#fff'}} />
                        </Button>
                    </Header>
                    <View style={Platform.OS === 'ios' ? styles.iosSrcdes : styles.aSrcdes}>
                        <View style={styles.searchBar}>
                            <TouchableOpacity style={styles.navigateBtn}>
                                <Icon name='md-navigate' style={{fontSize: 24,color: '#3EC1D9'}} />
                                <Text style={{color: '#3EC1D9',fontSize: 13,fontWeight: '700',lineHeight: 14}}>NAVIGATE</Text>
                            </TouchableOpacity>
                            <View style={styles.place}>
                                <Text style={styles.placeText} >4th T Block East,  Jayanagara, Bengaluru</Text>
                            </View>
                        </View>
                    </View>
                    </View>



                </View>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(StartRide);
