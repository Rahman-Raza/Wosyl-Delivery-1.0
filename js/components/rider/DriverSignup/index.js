'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform, Image,CameraRoll} from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import Camera from 'react-native-camera'
var FileUpload = require('NativeModules').FileUpload;
import {
   AppRegistry,
   TouchableOpacity,
   TouchableHighlight,
} from 'react-native';

var { width, height } = Dimensions.get('window');

class DriverSignup extends Component {
    constructor(props) {
      super(props);

      this.state ={
        photoSource: '',
        images: [],
        pictureTaken: false,
        imagePath : '',
        cameraType: Camera.constants.Type.back,
        defaultOpen:false,
        cameraOpen: false,
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

    getInitialState() {
    return {
        
    }
}

uploadPicture = () =>{


console.log("checking pic upload auth token", this.props.auth_token);
console.log("checking photoSource:", this.state.photoSource);
 var obj = {
        uploadUrl: 'http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/upload_driver_license_image.json',
        method: 'POST', // default 'POST',support 'POST' and 'PUT' 
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': this.props.auth_token,        },
        fields: {
            
        },
        files: [
          {
             // optional, if none then `filename` is used instead 
            filename: 'drivers_license_image', // require, file name 
            filepath: this.state.photoSource, // require, file absoluete path 
            filetype: 'image/JPG',
            
             // options, if none, will get mimetype from `filepath` extension 
          },
        ]
    };
    FileUpload.upload(obj, function(err, result) {
      console.log('upload:', err, result);
    })



}

setImagePath = (data) => {

  this.setState({imagePath: data.path});
  console.log("did take picture", data);
  console.log("checking pic", this.state.imagePath);

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

    _switchCamera = () =>  {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    }
 
    _takePicture = () =>  {
        this.refs.cam.capture().then((data) => setTimeout(() => {this.setImagePath(data)},1000)).catch(err => console.error(err));
            
            this.setState({pictureTaken: true});
        

        this.setState({cameraOpen:false});
        this.setState({defaultOpen: true});
        this.setState({pictureTaken: true});

        const fetchParams = {
          first: 1,
        };
        //CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);

        setTimeout(() => {
     CameraRoll.getPhotos({first: 2}).done(
        (data) =>{
           console.log("did get picturesss",data);
          this.setState({
            photoSource:  data.edges[0].node.image.uri
          });
        },
        (error) => {
          console.warn(error);
        }
      );
    
  }, 1500);
        setTimeout(() => {this.uploadPicture()}, 2000);




      
    }

    Pics = () => {
      this.setState({cameraOpen:true});
      this.setState({defaultOpen: false});

    }

    storeImages = (data) => {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

    startCamera = () => {
      return (

        <Camera
                      ref="cam"
                      style={styles.container}
                      type={this.state.cameraType}>


                      <View style={styles.buttonBar}>

                        

                          <TouchableOpacity style={styles.button} onPress={this._switchCamera}>
                              <Text style={styles.buttonText}>Flip</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.button} onPress={this._takePicture}>
                              <Text style={styles.buttonText}>Take</Text>
                          </TouchableOpacity>
                      </View>
                    </Camera> 



              )
    }

    
    
    render() {


      if (this.state.cameraOpen){
        return this.startCamera();
      }

      else
        return ( 
                


                    

                
              
                  
                  
                    
                  

                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={{ fontSize: 18,fontWeight: '500', color:'#000',}}>Please enter the following.</Text>
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

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.open}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({open: false})}
                                       style={{alignItems: 'center',}}>
                                       
                                          <TouchableOpacity
                                             style={{margin: 5, marginBottom:50}}
                                             onPress={() => this.setState({open: false})}>
                                            <Text style={{fontSize: 20, marginBottom: 10}}>Please enter all fields.</Text>
                                          </TouchableOpacity>
                                       
                                    </Modal>
                         </View>

                         <View style={styles.regBtnContain}>
                            <Button block style={styles.regBtn} onPress={() => this.setState({cameraOpen:true})}>

                               <Text style={{color: '#fff',fontWeight: '600'}}>Take License Pic</Text>
                            </Button>
                        </View>

                        

                       




                        <View style={styles.container}>
                          
                        </View>
                        <View style={styles.regBtnContain}>{this.state.pictureTaken&& <Button onPress={() => fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/driver_sign_up.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.auth_token,
                                                      },
                                                      body: JSON.stringify({
                                                        
                                                        street_name:this.state.street_name,
                                                        city: this.state.city,
                                                        state: this.state.state,
                                                        zip: this.state.zip,
                                                        social_security_number: this.state.social_security_number,
                                                        drivers_license_image: this.state.photoSource,
                                                        
                                                        

                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            

                                                            console.log("driver signup complete", responseJson);
                                                            if (responseJson.success){

                                                              this.popRoute()

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
                            </Button>}{this.state.pictureTaken && 

                        <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>

                        
                        
                          { this.state.pictureTaken && <Image style={styles.image} source={{ uri: this.state.photoSource }} /> }
                        

                            

                        </View>}


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

function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(mapStateToProps, bindActions)(DriverSignup);
