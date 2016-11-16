'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity,Dimensions,Platform } from 'react-native';

import { popRoute,replaceOrPushRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, Card } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Payment extends Component {
    
    popRoute() {
        this.props.popRoute();
    }
    replaceOrPushRoute(route) {
         this.props.replaceOrPushRoute(route);
    }
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
     
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>Payment</Text>
                        <Button transparent  onPress={() => this.replaceOrPushRoute('cardPayment')}>
                            <Icon name='ios-card' style={{color: '#797979'}} />
                        </Button>
                    </Header>
                    <View>
                        <View style={styles.payModeType}>
                            <Text style={styles.payModeText}>YOUR PAYMENT METHOD</Text>
                        </View>
                        <TouchableOpacity style={styles.payMethod1}>
                            <View style={{borderWidth: 1,borderColor: '#aaa'}}><Image source={require('../../../../images/paytm2.png')} style={styles.paytmIcon} /></View>
                            <Text style={{marginLeft: 20}}>PAYTM WALLET<Text style={{fontSize: 12,color: 'green',textAlign: 'center'}}> $0</Text></Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payMethod2}>
                            <Icon name='ios-cash' style={{fontSize: 40, color: 'green'}} />
                            <Text style={{marginLeft: 20,marginTop: 8}}>CASH</Text>
                        </TouchableOpacity>
                    </View>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
    }
}

export default connect(null, bindActions)(Payment);
