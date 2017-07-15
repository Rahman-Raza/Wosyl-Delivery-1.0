'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS, ScrollView, DeviceEventEmitter, AsyncStorage} from 'react-native';

import { replaceRoute,popRoute} from '../../../actions/route';
import {setUser} from '../../../actions/user';


import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

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


class SignIn extends Component {

  static propTypes = {
    
    replaceRoute: React.PropTypes.func,
  }




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


    keyboardWillShow(e) {
    
    this.setState({visiblePadding: 300})
    console.log("set the visible padding")
  }

  keyboardWillHide(e) {
    this.setState({visiblePadding: 0})

  }


   componentWillMount(){

     DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
}

loginUser = () =>{

  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/login.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': '587a895e216fefe49218f651b1bd16f5',
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        email: this.state.email,
                                                        password: this.state.password,
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.success){

                                                              this.state.name = responseJson.user.first_name;

                                                               this.setState({userDetail: responseJson.user});
                                                              

                                                                if(responseJson.user.is_phone_verified ){
                                                                    console.log("checking signIn status:", responseJson);
                                                                    this.setState({is_driver_verified:responseJson.user.is_driver_verified});

                                                                    if(responseJson.user.is_online = true){  //user is already marked as online, cannot proceed.
                                                                    
                                                                 //     this.setState({AlreadySignedIn: true});
                                                                 // this.setState({email:''});
                                                                 // this.setState({password:''});

                                                                 this.props.setUser(responseJson.user);
                                                                    AsyncStorage.multiSet([['token',this.state.password],['userID',responseJson.user.email]]);
                                                                     console.log("got to the here3");
                                                                 this.replaceRoute('home',this.state.userDetail);
                                                                      }

                                                                    else{  //No device is logged in with this account, can proceed


                                                                    this.props.setUser(responseJson.user);
                                                                    AsyncStorage.multiSet([['token',this.state.password],['userID',responseJson.user.email]]);
                                                                     console.log("got to the here3");
                                                                 this.replaceRoute('home',this.state.userDetail);
                                                                  }
                                                                }

                                                                 else{
                                                                    this.state ={
                                                                      is_activated: responseJson.user.is_activated,
                                                                      
                                                                      
                                                                    };

                                                                    console.log("got to the here");

                                                                    if(this.state.is_activated){

                                                                      AsyncStorage.multiSet([['token',this.state.password],['userID',responseJson.user.email]]);
                                                                      console.log("got to the here2");
                                                                    this.replaceRoute('PhoneVerify',responseJson.user);

                                                                    }
                                                                }
                                                            }

                                                            else{
                                                                this.setState({open: true});
                                                                this.setState({email:''});
                                                                this.setState({password:''})



                                                            }
                                                          })

}

 


    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle="default" />
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name="md-arrow-back" style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Sign In</Text>
                    </Header>
                    <View style={{padding: 10}}>
                      <View  style={{
                        paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center', }}>
                        <Image
                        style={{padding:50}}
                          source={require('../login/logo1x.png')}>
                          </Image>
                        
                      </View>
                      <View style={{marginTop:40}}>
                        <View style={{padding: 10}}>
                            <InputGroup borderType="rounded" style={{marginLeft:20,marginRight:20}}>
                                <Icon name='ios-contact' style={{color:'#16ADD4'}}/>
                                <Input borderType='rounded' onChangeText={(text) => this.setState({email:text})} autoCapitalize="none" value={this.state.email}placeholder="Email Address" placeholderTextColor="#797979" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType="rounded" style={{marginLeft:20,marginRight:20}}>
                            <Icon name='ios-lock' style={{color:'#16ADD4'}}/>
                                <Input borderType='rounded' onChangeText={(text) => this.setState({password:text})} value={this.state.password}placeholder="Password" secureTextEntry={true} placeholderTextColor="#797979" />
                            </InputGroup>
                        </View>


                        <View style={{  paddingVertical: 20,
    paddingHorizontal: 10}}>



                                
                                <Button rounded onPress={() => this.loginUser()}   
                                 block style={{marginLeft:20,marginRight:20,marginBottom: this.state.visiblePadding}} >
                                  
                                    <Text style={{fontWeight: '600',color: '#fff'}}>SIGN IN</Text>
                                </Button>
                        </View>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.open}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({open: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Email address and Password do not match</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({open: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

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
                         
                    </View>


                </Container>

        )
    }
}
var viewState = function(){
      console.log(this.state);
    }

function bindActions(dispatch){
    return {
        replaceRoute:(route,userDetail)=>dispatch(replaceRoute(route,userDetail)),
        popRoute: () => dispatch(popRoute()),
        pushNewRoute: () => dispatch(pushNewRoute(route)),
        setUser: (name) => dispatch(setUser(name)),
        
    }
}



export default connect(null, bindActions)(SignIn);
