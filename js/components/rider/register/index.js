'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform } from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Register extends Component {
    constructor(props) {
      super(props);

      this.state ={
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
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
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Register</Text>
                    </Header>
                    <View style={{padding: 10}}>
                        <Grid>
                            <Col style={{padding: 10}}>
                                <Button block style={{borderRadius: 0,backgroundColor: '#DD4B3E'}}>
                                    <Icon name='logo-googleplus' style={{fontSize: 28}} />
                                </Button>
                            </Col>
                            <Col style={{padding: 10}}>
                                <Button block style={{borderRadius: 0,backgroundColor: '#3B579D'}}>
                                    <Icon name='logo-facebook' style={{fontSize: 28}} />
                                </Button>
                            </Col>
                        </Grid>
                        <View style={{padding: 10}}>
                            <Text style={styles.orText}>OR</Text>
                        </View>
                        <Grid>
                            <Col style={{padding: 10}}>
                                <InputGroup>
                                    <Input onChangeText={(text) => this.setState({first_name:text})}
                                    value={this.state.first_name} placeholder='First Name' placeholderTextColor='#797979' />
                                </InputGroup>
                            </Col>
                            <Col style={{padding: 10}}>
                                <InputGroup>
                                    <Input onChangeText={(text) => this.setState({last_name:text})}
                                    value={this.state.last_name} placeholder='Last Name' placeholderTextColor='#797979' />
                                </InputGroup>
                            </Col>
                        </Grid>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({email:text})}
                                    value={this.state.email}placeholder='Email' placeholderTextColor='#797979' keyboardType='email-address' />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({phone_number:text})}
                                    value={this.state.phone_number}placeholder='Mobile Number' placeholderTextColor='#797979' keyboardType='numeric' />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup>
                                <Input onChangeText={(text) => this.setState({password:text})}
                                    value={this.state.password} placeholder='Password' secureTextEntry={true} placeholderTextColor='#797979' />
                            </InputGroup>
                        </View>
                        <View style={styles.regBtnContain}>
                            <Button onPress={() => fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/sign_up.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': '587a895e216fefe49218f651b1bd16f5',
                                                      },
                                                      body: JSON.stringify({
                                                        first_name: this.state.first_name,
                                                        last_name: this.state.last_name,
                                                        email: this.state.email,
                                                        phone_no: this.state.phone_number,
                                                        password: this.state.password,
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {
                                                            if (responseJson.success){

                                                                this.setState({userDetail: responseJson.user});
                                                                console.log("Register User Detail");
                                                                console.log(this.state.userDetail);
                                                                 this.replaceRoute('PhoneVerify',this.state.userDetail);
                                                            }
                                                          })
                                                          .catch((error) => {
                                                            console.error(error);
                                                          })



                                                }    block style={styles.regBtn}>
                                <Text style={{color: '#fff',fontWeight: '600'}}>REGISTER</Text>
                            </Button>

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

export default connect(null, bindActions)(Register);
