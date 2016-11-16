'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform } from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

class PhoneVerify extends Component {
    constructor(props) {
      super(props);

      this.state ={

      phone_code: '',
      open: false,
     
    };
    }
    popRoute() {
        this.props.popRoute();
    }
     replaceRoute(route, userDetail) {
        
        this.props.replaceRoute(route,userDetail);
    }
    
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Please verify your phone number.</Text>
                    </Header>
                    <View style={{padding: 10}}>
                        
                       
                        
                        
                            
                        <View style={{padding: 50}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({phone_code:text})}
                                    value={this.state.phone_code} placeholder='Enter SMS Verification Code Here'  placeholderTextColor='#797979' keyboardType='phone-pad' />
                            </InputGroup>
                        </View>
                        <View style={styles.regBtnContain}>
                            <Button onPress={() => fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/verify_phone.json?' + 'phone_verification_code=' + this.state.phone_code, {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.authToken,
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked");
                                                            console.log('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/verify_phone.json?' + 'phone_verification_code=' + this.state.phone_code);
                                                            console.log('auth code:');
                                                            console.log(this.props.authToken);
                                                            if (responseJson.success){
                                                              console.log("phone verify sucess");
                                                                 this.replaceRoute('home',responseJson.user);
                                                            }

                                                            else{
                                                              this.setState({open: true});
                                                                this.setState({phone_code:''});

                                                            }
                                                          })
                                                          .catch((error) => {
                                                            this.setState({open: true});
                                                                this.setState({phone_code:''});
                                                          })



                                                }    block style={styles.regBtn}>
                                <Text style={{color: '#fff',fontWeight: '600'}}>SUBMIT</Text>
                            </Button>


                            <Button    block style={styles.regBtn}>
                                <Text style={{color: '#fff',fontWeight: '600'}}>Request new Verification Code</Text>
                            </Button>


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
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please Try Again</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({open: false})}>
                                             <Text>Close</Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>
                                </View>
                    </View>





                </Container>
               



                
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route,userDetail)=>dispatch(replaceRoute(route,userDetail))
    }
}

function mapStateToProps(state) {

    console.log("checkingusersetPhoneVerify");
    console.log(state);
    if (state.route.users){
      console.log("acess token: ");
      console.log(state.route.users.access_token);
        return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    authToken: state.route.users.access_token,

    
  }
    }
 

    else{
  return {
    first_name: "first Name",
    last_name: "lastname",
    email: "email",
    phone_no: "phone number",
    authToken: 'none',
    
  }
}
}




export default connect(mapStateToProps, bindActions)(PhoneVerify);