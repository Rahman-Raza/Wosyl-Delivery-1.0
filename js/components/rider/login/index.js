'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions,StatusBar,Image, AsyncStorage, TouchableOpacity, } from 'react-native';

import {  pushNewRoute } from '../../../actions/route';
import { replaceRoute,popRoute} from '../../../actions/route';
import {setUser} from '../../../actions/user';

import { Content, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Modal from 'react-native-simple-modal';
import styles from './styles';
import theme from '../../../themes/base-theme';

var Orientation = require('react-native-orientation');
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

    constructor(props) {
      super(props);

      this.state ={
        AlreadySignedIn: false,
        token: null,
        user: null,
        badLogin: null,
        visiblePadding: 0,
        open: false,
        name: '',
        password: '',
        is_driver_verified: false,
    };
    }
     setUser(users) {
    this.props.setUser(users);
  }
    replaceRoute(route, userDetail) {
        this.setUser(this.state.name);
        this.props.replaceRoute(route,userDetail);
    }
    
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }
    
    popRoute() {
        this.props.popRoute();
    }
    
   componentWillMount (){
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
   }

   componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
    
   

    componentDidMount (){

       Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations
         AsyncStorage.multiGet(['token','userID']).then((data) => {
            if (data[0][1]){
                console.log("looking at data", data);
                var password = data[0][1];
                var user = data[1][1];

                console.log("seeing pass and user", password, user);

             fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/login.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': '587a895e216fefe49218f651b1bd16f5',
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        email: data[1][1].toString(),
                                                        password: data[0][1].toString(),
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("checking response at loginnn", responseJson);
                                                            if (responseJson.success){

                                                              
                                                               this.setState({userDetail: responseJson.user});
                                                              

                                                                if(responseJson.user.is_phone_verified ){
                                                                    this.setState({is_driver_verified:responseJson.user.is_driver_verified});

                                                                    if(responseJson.user.is_driver_verified){

                                                                    //     if(responseJson.user.is_online){  //user is already marked as online, cannot proceed.

                                                                    //   this.setState({AlreadySignedIn: true});
                                                              
                                                                    // }

                                                                    // else{  //No device is logged in with this account, can proceed

                                                                     
                                                                      this.replaceRoute('home',responseJson.user);

                                                                    //}
                                                                  }

                                                                    else{


                                                                    this.props.setUser(responseJson.user);
                                                                     console.log("responseUser checkkk", responseJson.users);
                                                                    
                                                                 this.replaceRoute('home',responseJson.user);
                                                                  }
                                                                }

                                                                 else{
                                                                    this.state ={
                                                                      is_activated: responseJson.use.is_activated,
                                                                      
                                                                      
                                                                    };

                                                                    if(this.state.is_activated){


                                                                    this.replaceRoute('PhoneVerify',responseJson.user);
                                                                    }
                                                                }
                                                            }

                                                            else{
                                                                



                                                            }
                                                          })
                                                          .catch((error) => {
                                                            console.error(error);
                                                          })
                                                      }
        })
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
                     <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.AlreadySignedIn}
                                       modalDidOpen={() => console.log('Already Signed In modal did open')}
                                       modalDidClose={() => this.setState({AlreadySignedIn: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>This account is already signed in to another device.</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({AlreadySignedIn: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>
                </View>
            )

           
       


        
    }
}


function bindActions(dispatch){
    return {
        
        
         replaceRoute:(route,userDetail)=>dispatch(replaceRoute(route,userDetail)),
        popRoute: () => dispatch(popRoute()),
         
        pushNewRoute: (route) => dispatch(pushNewRoute(route)),
        
        
        setUser: (name) => dispatch(setUser(name)),
    }
}

export default connect(null, bindActions)(Login);
