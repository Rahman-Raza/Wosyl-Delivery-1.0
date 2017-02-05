'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions,Platform,Image,CameraRoll} from 'react-native';

import { popRoute } from '../../../actions/route';

import { Container, Header, Content, Text, Button, Icon, Card, CardItem, Input, Title } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import Camera from 'react-native-camera';
var FileUpload = require('NativeModules').FileUpload;

var { width, height } = Dimensions.get('window');




class Settings extends Component {

    static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    replaceOrPushRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    
     first_name: React.PropTypes.string,
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,

    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

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

_switchCamera = () =>  {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    }
 
    _takePicture = () =>  {
        this.refs.cam.capture().then((data) => setTimeout(() => {this.setImagePath(data)},1500)).catch(err => console.error(err));
            
            this.setState({pictureTaken: true});
        

        this.setState({cameraOpen:false});
        this.setState({defaultOpen: true});
        this.setState({pictureTaken: true});

        const fetchParams = {
          first: 1,
        };
        //CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);

        setTimeout(() => {
     CameraRoll.getPhotos({first: 1}).done(
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
    
  }, 200);
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

                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Your Account</Title>
                        
                    </Header>
                    <Content>
                        <View style={{backgroundColor: '#eee'}}>{!this.state.pictureTaken && !this.props.userImage && <Icon name='ios-person' style={styles.profileIcon} />
                        }{this.state.pictureTaken && 

                        <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>

                        
                        
                           <Image style={styles.image} source={{ uri: this.state.photoSource }} /> 
                        

                            

                        </View>}{this.props.userImage && !this.state.pictureTaken && 

                        <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>

                        
                        
                           <Image style={styles.image} source={{ uri: this.props.drivers_license_image_thumb_url }} /> 
                        

                            

                        </View>}

                        </View>
                        <Card>
                            <CardItem style={[{flexDirection: 'row'}, styles.inputContainer]}>
                                <CardItem style={styles.input}>
                                    <Text note>FIRST NAME</Text>
                                    <Text >{this.props.first_name}</Text>
                                </CardItem>
                                <CardItem style={styles.input}>
                                    <Text note>LAST NAME</Text>
                                    <Text >{this.props.last_name}</Text>
                                </CardItem>
                            </CardItem>
                            <CardItem style={styles.inputContainer}>
                                <CardItem style={styles.input}>
                                    <Text note>EMAIL</Text>
                                    <Text >{this.props.email}</Text>
                                </CardItem>
                                <CardItem style={styles.input}>
                                    <Text note>MOBILE</Text>
                                    <Text >{this.props.phone_no}</Text>
                                </CardItem>

                               
                            </CardItem>

                        </Card>

                        <View style={styles.regBtnContain}>
                            <Button block style={styles.regBtn} onPress={() => this.setState({cameraOpen:true})}>

                               <Text style={{color: '#fff',fontWeight: '600'}}>Change Profile Picture</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
        )
    }
}

function bindActions(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute:()=>dispatch(popRoute())
    }
}

function mapStateToProps(state) {

    console.log("maptostateSettings:");
    console.log(state);

    if (state.route.users){

        var imageExists = false;

        if (state.route.users.drivers_license_image_large_url == 'http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/assets/missing.png'){
            
        }

        else{
            imageExists = true;
        }

    
  return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,
    auth_token: state.route.users.access_token,
    drivers_license_image_thumb_url: state.route.users.drivers_license_image_large_url,
    userImage: imageExists,

    
  };
}

else {
     return {
    first_name: "Someones",
    last_name: "Last name",
    email: "Email address",
    phone_no: "Phone number",

    
  };

}

}




export default connect(mapStateToProps, bindActions)(Settings);
