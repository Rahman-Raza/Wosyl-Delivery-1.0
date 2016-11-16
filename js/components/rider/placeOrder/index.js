'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform,  ProgressViewIOS} from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';
import { createSession } from '../../../actions/route';

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

class placeOrder extends Component {
    constructor(props) {
      super(props);

      this.state ={
        progress: 0.75,
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

    createSession(response){
      this.props.createSession('inSession',response);
    }

    
    
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Confirm Order</Text>
                    </Header>
                   <View  >
              <View >
              
                

                 


                  


                  <View style={{paddingTop: 20}}>
                   
                   
                    
                    <Text style={styles.buttonText2}>Order Details</Text>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30}}>From: {this.props.fromLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30}}>To: {this.props.toLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30}}>Item: {this.props.itemPickup}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30}}>Notes: {this.props.notes}</Text>
                    </View>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30}}>Estimated cost: $3 Base Fee + {this.props.distance} miles x $1 per mile = ${this.props.cost}</Text>
                    </View>


                 
                    </View>
        
                 

                  <Button rounded bordered block style={{marginLeft: 30, marginRight:30,  backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',}} onPress={() => {
                    console.log("checking locations");
                    console.log(this.props.fromLatitude);
                    console.log(this.props.toLatitude);


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
                                                        notes: this.props.notes,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for create pickup");
                                                            
                                                            if (responseJson.success){
                                                              console.log("create pickup success");
                                                              console.log(responseJson);
                                                               this.createSession(responseJson);
                                                                 
                                                            }

                                                            else{
                                                              this.setState({open: true});
                                                                
                                                                 
                                                             

                                                            }
                                                          })
                                                          


              
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
      

        return {

          cost: cost,
          distance: distance,
          toLocation: state.route.pickup.toLocation,
          toLatitude: state.route.pickup.toLatitude,
          toLongtitude: state.route.pickup.toLongtitude,
          fromLocation: state.route.pickup.fromLocation,
          fromLatitude: state.route.pickup.fromLatitude,
          fromLongtitude: state.route.pickup.fromLongtitude,
          itemPickup: state.route.pickup.itemPickup,
          notes: notes,
          userDetail: state.route.users,
          

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
