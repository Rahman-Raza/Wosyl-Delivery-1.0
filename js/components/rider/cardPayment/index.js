'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity,Dimensions,Platform } from 'react-native';

import { pushNewRoute,  popRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, Card } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';
var { width, height } = Dimensions.get('window');

class cardPayment extends Component {
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >

                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Payment</Text>
                    </Header>
                    <View>
                        <View style={styles.cardSelect}>
                            <Text style={{fontSize: 14,fontWeight: '600'}}>SELECT HOW YOU WOULD LIKE TO PAY</Text>
                        </View>
                        <TouchableOpacity style={styles.payCard} onPress={() => this.pushNewRoute('creditCard')} >
                            <Icon name='ios-card' style={{fontSize: 40, color: '#24BCD9'}} />
                            <Text style={{marginLeft: 20,marginTop: 8}}>Credit/Debit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.payCard, {marginTop: 15,paddingBottom: 10}]}>
                            <View style={{borderWidth: 1,borderColor: '#aaa'}}><Image source={require('../../../../images/paytm2.png')} style={styles.paytmIcon} /></View>
                            <Text style={{marginLeft: 20}}>Paytm Money</Text>
                        </TouchableOpacity>

                    </View>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(cardPayment);
