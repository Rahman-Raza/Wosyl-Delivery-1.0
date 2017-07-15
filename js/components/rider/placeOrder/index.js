'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform,  ProgressViewIOS} from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';
import { createSession } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

var BTClient = require('react-native-braintree-xplat');

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

var passedNonce = false;

class placeOrder extends Component {
    constructor(props) {
      super(props);

      this.state ={
        paymentError: false,
        userPaymentSaved: false,
        progress: 0.75,
        errorPhone: false,
        open: false,
        phone_code: '',
      fromLocation: '',
      toLocation: '',
      itemPickup: '',
      notes: '',

     
    };
    }
    popRoute() {

        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 

    createSession = (response) => {
      console.log("got to passedNonce");
      this.props.createSession('inSession',response);
    }

createOrder = () => {
  fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/create.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.userDetail.access_token,
                                                      },
                                                      body: JSON.stringify({
                                                        pickup_from : this.props.fromLocation,
                                                        from_latitude: this.props.fromLatitude,
                                                        from_longitude: this.props.fromLongtitude,
                                                        pickup_to: this.props.toLocation,
                                                        to_latitude: this.props.toLatitude,
                                                        to_longitude: this.props.toLongtitude,
                                                        item: this.props.itemPickup,
                                                        customer_phone_no: this.props.customer_phone_no,
                                                        notes: this.props.notes,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for create pickup");
                                                            
                                                            if (responseJson.success){
                                                              console.log("create pickup success");
                                                              console.log(responseJson);

                                                              this.setupBraintree(responseJson);
                                                              
                                                                 
                                                            }

                                                            else{
                                                             
                                                              console.log("create pickup not success");
                                                              this.handleErrors(responseJson.errors);
                                                              console.log(responseJson);
                                                               this.setState({open: true});
                                                                
                                                                 
                                                             

                                                            }
                                                          })
}
     

    handleErrors = (errors) =>{
      if (errors[0] == "Customer phone no is an invalid number"){
        this.setState({errorPhone: true});
        console.log("got to handleErrors");
      }
    }
    setupBraintree = (pickupObject) => {

      var access_token = this.props.userDetail.access_token;
      this.setState({pickupObject: pickupObject});
      var cost = this.props.cost;
     

      console.log("checking first  auth_token", this.props.auth_token);
      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/get_braintree_token.json', {
                                                            method: 'POST',
                                                            headers: {
                                                              'Accept': 'application/json',
                                                              
                                                              'X-Auth-Token': this.props.userDetail.access_token,
                                                            },
                                                          
                                                          }) .then((response) => response.json())
                                                                .then((responseJson) => {

                                                                  console.log("json worked for braintree token",responseJson);
                                                                  console.log("checking auth_token", this.props.auth_token);
                                                                  
                                                                  if (responseJson.success){
                                                                    console.log("checking BTC token",responseJson.token );
                                                                    BTClient.setup(responseJson.token);

                                                                    if(this.props.payment_setup == false){
                                                                    this.passNonceToServer(pickupObject);
                                                                  }
                                                                  else{
                                                                    this.confirmTransaction(pickupObject);
                                                                  }

                                                                     
                                                                       
                                                                  }
                                                                    }).done();

        console.log("check cost and pickup id",this.props.cost, pickupObject.pickup.id);

      
    }

    confirmTransaction = (pickupObject) =>{

      if (this.props.payment_setup){
      this.setState({paymentConfirmation: true});
    }
      else{
        this.setState({paymentConfirmation_setup: true});
      }


    }

    

    createTransactionAuto = (pickupObject) =>{




      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/create_transaction.json', {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': this.props.userDetail.access_token,
                                                        },
                                                        body: JSON.stringify({
                                                           
                                                          amount: this.props.cost,
                                                          pickup_id: pickupObject.pickup.id,
                                                          
                                                          
                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {

                                                              console.log("json worked for create transaction auto");
                                                              
                                                              if (responseJson.success){
                                                                 console.log("passing payment success", responseJson);
                                                                 
                                                                 this.createSession(pickupObject);


                                                                
                                                                   
                                                              }

                                                              else{
                                                                console.log("passing payment auto not success", responseJson);
                                                                this.setState({paymentError: true});

                                                              }
                                                            }).done();
    }

    savePaymentMethod = (nonce) =>{

      fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/save_payment_method.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token':this.props.userDetail.access_token,
                                                      },
                                                      body: JSON.stringify({
                                                         payment_method_nonce: nonce,
                                                        
                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for save nonce");
                                                            
                                                            if (responseJson.success){
                                                               console.log("saving user payment info good", responseJson);
                                                               this.setState({userPaymentSaved: true});
                                                             
                                                              


                                                              
                                                                 
                                                            }

                                                            else{
                                                              this.setState({open: true});
                                                              console.log("nothing was sent to save the nonce for customer");
                                                             

                                                            }
                                                          }).done();

    }



    passNonceToServer = (pickupObject) =>{

       var access_token = this.props.userDetail.access_token;
       console.log("here access token", access_token);
      var cost = this.props.cost;
      var noncePass = false;

      var scope = this;
      
      function createTheSession(){
        console.log("got to createTheSession");
        scope.createSession(pickupObject);
      }

      function saveThePayment(nonce){
        console.log("got to saveThePayment");
        scope.savePaymentMethod(nonce);
      }

      function checkPaymentSetup(){
        return scope.props.payment_setup
      }

      setTimeout(() => {
            BTClient.showPaymentViewController()
                .then(function(nonce) {
                   saveThePayment(nonce);

      console.log("postman info: access token: ", this.props.userDetail.access_token, "pickupID: ", pickupObject.pickup.id, "amount: ", this.props.cost );

                  //payment succeeded, pass nonce to server
                  console.log("payment passed");
                  //console.log("here the prop", this.props.auth_token);
                  console.log("here the nonce", nonce);

                  console.log("check pickupObject", pickupObject);
                  console.log("postman info for passing nonce to server: access_token, nonce, amount, pickup id", access_token, nonce, cost, pickupObject.pickup.id);
                  var paymentObject = {"pickup_id" : pickupObject.pickup.id, "amount" : cost, "payment_method_nonce" : nonce};
                  var JSONObject = JSON.stringify(paymentObject);
                  console.log("checking JSON pay object", JSONObject);
                
                 
                                   
                    fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/user/create_transaction.json', {
                                                        method: 'POST',
                                                        headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',
                                                          'X-Auth-Token': access_token,
                                                        },
                                                        body: JSON.stringify({
                                                           
                                                          amount: cost,
                                                          pickup_id: pickupObject.pickup.id,
                                                          
                                                          
                                                        })
                                                      }) .then((response) => response.json())
                                                            .then((responseJson) => {

                                                              console.log("json worked for save nonce");
                                                              
                                                              if (responseJson.success){
                                                                 console.log("passing payment success", responseJson);
                                                                  passedNonce = true;
                                                                 noncePass = true;
                                                                 createTheSession(pickupObject);


                                                                
                                                                   
                                                              }

                                                              else{
                                                                console.log("passing payment not success", responseJson);
                                                                this.setState({paymentError: true});

                                                              }
                                                            }).done();
                

                  

                }).done();
                console.log("done BTClient");

                
                  
            }, 2000);

     

        
        
    }

        
    
    
   
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#000'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28,color:'white'}} />
                        </Button>
                        <Text style={{ fontSize: 18,fontWeight: '500',color: 'white'}}>Confirm Order</Text>
                    </Header>
                   <View  >
              <View >
              
                

                 


                  


                  <View style={{paddingTop: 50}}>
                   
                   
                    
                    <Text style={styles.buttonText2}>Order Details</Text>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>From: {this.props.fromLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>To: {this.props.toLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Item: {this.props.itemPickup}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Notes: {this.props.notes}</Text>
                    </View>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Estimated cost: $3 Base Fee + {this.props.distance} miles x $1 per mile = ${this.props.cost}</Text>
                    </View>


                 
                    </View>
        
                 

                  <Button rounded bordered block style={{marginLeft: 30, marginRight:30,  backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',}} onPress={() => {
                    console.log("checking locations");
                    console.log(this.props.fromLatitude);
                    console.log(this.props.toLatitude);

                    this.createOrder();


                    
                                                          


              
            }}  underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Place Order</Text>
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
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please check your order details and Try again.</Text>
                                          
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
                                       open={this.state.errorPhone}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({errorPhone: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please enter a valid phone number starting with a 1.</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({errorPhone: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentError}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentError: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>There was an issue with your payment, please try again.</Text>


                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentError: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentConfirmation}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentConfirmation: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Would you like to continue with your previously used payment method or use a different one?</Text>

                                          <Button rounded bordered block style={{marginLeft: 30, marginRight:30,  backgroundColor: '#48BBEC',borderColor: '#48BBEC',}} onPress={() => {
                                                              this.createTransactionAuto(this.state.pickupObject);
                                                              this.setState({paymentConfirmation:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>Continue</Text>
                                            </Button>
                                            <Button rounded bordered block style={{marginLeft: 30, marginRight:30, marginTop:20, backgroundColor: '#48BBEC',
                                              borderColor: '#48BBEC',}} onPress={() => {
                                                              

                                                              this.passNonceToServer(this.state.pickupObject);
                                                              this.setState({paymentConfirmation:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>New Payment</Text>
                                            </Button>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentConfirmation: false})}>
                                             <Text></Text>
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                     <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.paymentConfirmation_setup}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({paymentConfirmation_setup: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                         
                                            <Button rounded bordered block style={{marginLeft: 30, marginRight:30, marginTop:20, backgroundColor: '#48BBEC',
                                              borderColor: '#48BBEC',}} onPress={() => {
                                                              

                                                              this.passNonceToServer(this.state.pickupObject);
                                                              this.setState({paymentConfirmation_setup:false});
                                                            }}  underlayColor='#99d9f4'>
                                              <Text style={styles.buttonText}>New Payment Setup</Text>
                                            </Button>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({paymentConfirmation_setup: false})}>
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


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createSession: (route,pickup) =>dispatch(createSession(route,pickup))
    }
}
function mapStateToProps(state) {

    console.log("checkingpickupset");
    console.log(state);
    if (state.route.pickup){

       var rad = function(x){

      return x * Math.PI / 180;
      }

       var getDistance = function (p1,p2){
          var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round((d * 0.00062137)).toString(); // returns the distance in miles.
        }


      var p1 = {"lat": state.route.pickup.fromLatitude, "lng": state.route.pickup.fromLongtitude};
      var p2 = {"lat": state.route.pickup.toLatitude, "lng": state.route.pickup.toLongtitude};
      var distance = getDistance(p1,p2);
      var cost = (parseInt(distance) + 3).toString();

      if(state.route.pickup.notes == ""){
        var notes = "N/A"
      }
      else {
        var notes = state.route.pickup.notes;
      }
      var cost = (parseInt(state.route.pickup.delivery_distance) + 3).toString();

        return {

          cost: cost,
          distance: state.route.pickup.delivery_distance,
          toLocation: state.route.pickup.toLocation,
          toLatitude: state.route.pickup.toLatitude,
          toLongtitude: state.route.pickup.toLongtitude,
          fromLocation: state.route.pickup.fromLocation,
          fromLatitude: state.route.pickup.fromLatitude,
          fromLongtitude: state.route.pickup.fromLongtitude,
          itemPickup: state.route.pickup.itemPickup,
          notes: notes,
          customer_phone_no: state.route.pickup.customer_phone_no,
          userDetail: state.route.users,
          payment_setup: state.route.users.payment_setup,
          

      }

    

    
  }

    else{
      return{

        toLocation: 'empty',
          fromLocation: 'empty',
          itemPickup: 'empty',
          notes: 'empty',

      }
    }

}




export default connect(mapStateToProps, bindActions)(placeOrder);
