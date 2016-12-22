'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions,StatusBar,Image } from 'react-native';

import {  pushNewRoute } from '../../../actions/route';

import { Content, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class BackgroundImage extends Component {

    render() {
        return (

            <Image style={styles.backgroundImage}
                          source={require('../login/Rectangle904.png')}>

                          {this.props.children}
             </Image>

        )
    }
}

class Login extends Component {
    
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }
    
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 
    render() {
        return (
                <View >
                    <StatusBar barStyle='light-content' />
                    <Content theme={theme} style={{backgroundColor: '#19192B'}}>
                        <BackgroundImage>

                    
                            <View style={Platform.OS === 'ios' ? styles.iosLogoContainer : styles.aLogoContainer }>
                                <Image
                            style={{}}
                              source={require('../login/logo1x.png')}>
                              </Image>
                                <Text style={styles.logoText}>Wosyl Delivery</Text>
                            </View>
                       
                        

                    

                        <View style={{marginTop: 300, padding: 10, backgroundColor: '#fff'}}>
                            <Grid>
                                <Col style={{padding: 10}}>
                                <Button rounded onPress={() => this.pushNewRoute('signIn')} block ><Text style={{color: '#fff',fontWeight: '600'}}>SIGN IN</Text></Button>
                                </Col>
                                <Col style={{padding: 10}}>
                                <Button rounded onPress={() => this.pushNewRoute('register')} transparent bordered block ><Text style={{fontWeight: '600',color: '#1BBFDD'}}>REGISTER</Text></Button>
                                </Col>
                            </Grid>
                        </View>
                         </BackgroundImage>
                    </Content>
                    
                </View>
        )
    }
}


function bindActions(dispatch){
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
    }
}

export default connect(null, bindActions)(Login);
