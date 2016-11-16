'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions,Platform } from 'react-native';

import { popRoute } from '../../../actions/route';

import { Container, Header, Content, Text, Button, Icon, Title, Thumbnail } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Receipt extends Component {
    
    popRoute() {
        this.props.popRoute();
    }
     
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
     
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title>YOUR TRIP</Title>
                        
                    </Header>
                    <Content style={{padding: 20}}>
                        <View style={{alignItems: 'center'}}> 
                            <View style={styles.dateContainer}>
                                <View style={styles.sideLines}></View>
                                <Text style={styles.summaryText}>26 July 2016 2:46pm</Text>
                                <View style={styles.sideLines}></View>
                            </View>
                            <Text style={styles.amount}>$12</Text>
                            <View style={styles.dateContainer}>
                                <View style={styles.sideLines}></View>
                                <Text style={styles.summaryText}>TRIP SUMMARY</Text>
                                <View style={styles.sideLines}></View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Thumbnail square size={60} source={require('../../../../images/Contacts/avatar-8.jpg')} style={{borderRadius: 30}} />
                                <Text style={{alignSelf: 'center'}}>Mike Ross</Text>
                                <View style={styles.taxiNoContainer}>
                                    <Text style={styles.taxiNo}>KA09CD007</Text>
                                </View>
                            </View>

                            <View style={{padding: 40}}>
                                <View style={styles.feedBackBtn}>
                                    <TouchableOpacity style={{padding: 20}}>
                                        <Text style={styles.btnText}>LEAVE FEEDBACK</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{padding: 20}}>
                                        <Text style={styles.btnText}>NEED HELP ?</Text>
                                    </TouchableOpacity> 
                                </View>
                                <View style={styles.feedBackBtn}>  
                                    <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                    <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                    <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                    <Icon name='ios-star' style={{letterSpacing: 20,color: '#797979'}} />
                                    <Icon name='ios-star'style={{color: '#797979'}} />
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(Receipt);
