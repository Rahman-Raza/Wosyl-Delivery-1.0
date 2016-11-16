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

class DriverSignup extends Component {
    constructor(props) {
      super(props);

      this.state ={
      street_name: '',
      city: '',
      state: '',
      zip: '',
      social_security_number: '',
      open: false,


     
    };
    }
    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 

    componentDidMount(){

      navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });
    }
    
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Please enter the following.</Text>
                    </Header>
                   

                    <View style={{padding: 10}}>
                        
                       
                        
                        
                            
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({street_name:text})}
                                    value={this.state.street_name} placeholder='Home Address'  placeholderTextColor='#797979' />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({city:text})}
                                    value={this.state.city} placeholder='City'  placeholderTextColor='#797979' />
                            </InputGroup>
                        </View>
                       <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({state:text})}
                                    value={this.state.state} placeholder='State'  placeholderTextColor='#797979' />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({zip:text})}
                                    value={this.state.zip} placeholder='Zip Code'  placeholderTextColor='#797979' keyboardType='phone-pad' />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({social_security_number:text})}
                                    value={this.state.social_security_number} placeholder='Social Security Number'  placeholderTextColor='#797979' keyboardType='phone-pad' />
                            </InputGroup>
                        </View>

                        <View style={styles.container}>
                          
                        </View>
                        <View style={styles.regBtnContain}>
                            <Button onPress={() => fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/driver_sign_up.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': 'cccca0dfe53d5fdf42eeafb79ac5757e',
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        street_name:this.state.street_name,
                                                        city: this.state.city,
                                                        state: this.state.state,
                                                        zip: this.state.zip,
                                                        social_security_number: this.state.social_security_number,
                                                        drivers_license_image: this.state.picture,
                                                        

                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.success){
                                                                 this.popRoute('home');
                                                            }
                                                          })
                                                          .catch((error) => {
                                                            this.setState({open: true});
                                                                this.setState({street_name: '',
                                                                              city:'',
                                                                              state: '',
                                                                              zip: '',
                                                                              social_security_number: ''
                                                              });
                                                          })



                                                }    block style={styles.regBtn}>
                                <Text style={{color: '#fff',fontWeight: '600'}}>SUBMIT</Text>
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
                                             <Text>Close modal</Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>
                         </View>
                    </View>
              </Container>
               



                
        )
    }

    takePicture() {
    this.camera.capture()
      .then((data) => this.setState({picture: data,}))
      .catch(err => console.error(err));
  }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(DriverSignup);
