'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity,Dimensions,Platform } from 'react-native';

import { popRoute,replaceOrPushRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, Card } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';
var BTClient = require('react-native-braintree-xplat');

var { width, height } = Dimensions.get('window');

class Payment extends Component {
    
    popRoute() {
        this.props.popRoute();
    }
    replaceOrPushRoute(route) {
         this.props.replaceOrPushRoute(route);
    }

    setupBraintree = () => {

        console.log("checking first  auth_token", this.props.auth_token);
        fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/get_braintree_token.json', {
                                                              method: 'POST',
                                                              headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'X-Auth-Token': this.props.auth_token,
                                                              },
                                                            
                                                            }) .then((response) => response.json())
                                                                  .then((responseJson) => {

                                                                    console.log("json worked for braintree token",responseJson);
                                                                    console.log("checking auth_token", this.props.auth_token);
                                                                    
                                                                    if (responseJson.success){
                                                                      console.log("checking BTC token",responseJson.token );
                                                                      BTClient.setup(responseJson.token);
                                                                       
                                                                         
                                                                    }

                                                                    
                                                                  })


          setTimeout(function () {  BTClient.showPaymentViewController().then(function(nonce) {
            //callback after the user completes (or cancels) the flow.
            //with the nonce, you can now pass it to your server to create a charge against the user's payment method
            fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/save_nonce.json', {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.props.auth_token,
              },
              body: JSON.stringify({payment_method_nonce: nonce})
            }) .then((response) => response.json())
                                                                  .then((responseJson) => {

                                                                    console.log("json worked for saving braintree nonce",responseJson);
                                                                    
                                                                    
                                                                    

                                                                    
                                                                  })
          }); }, 500);





}
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
     
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>Payment</Text>
                        <Button transparent  onPress={() => this.replaceOrPushRoute('creditCard')}>
                            <Icon name='ios-card' style={{color: '#797979'}} />
                        </Button>
                    </Header>
                   <View>
                        <View style={styles.cardSelect}>
                            <Text style={{fontSize: 14,fontWeight: '600'}}>SELECT HOW YOU WOULD LIKE TO PAY</Text>
                        </View>
                        <TouchableOpacity style={styles.payCard} onPress={() => this.setupBraintree()} >
                            <Icon name='ios-card' style={{fontSize: 40, color: '#24BCD9'}} />
                            <Text style={{marginLeft: 20,marginTop: 8}}>Credit/Debit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setupBraintree()} style={[styles.payCard, {marginTop: 15,paddingBottom: 10}]}>
                            <Icon name='ios-cash' style={{fontSize: 40, color: '#24BCD9'}} />
                            <Text style={{marginLeft: 20}}>Paypal</Text>
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

function mapStateToProps(state) {

    console.log("checkinguserset");
    console.log(state);
    if (state.route.users){
        return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,

    
  }
    }
 

    else{
  return {
    first_name: "first Name",
    last_name: "lastname",
    email: "email",
    phone_no: "phone number",
    
  }
}
}

export default connect(mapStateToProps, bindActions)(Payment);
