
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform,Image,  AsyncStorage } from 'react-native';

import { replaceOrPushRoute, resetRoute,replaceRoute } from '../../../actions/route';
import { closeDrawer } from '../../../actions/drawer';

import { Content, View, Text, Icon, List, ListItem } from 'native-base';

import styles from './styles';




class SideBar extends Component {

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

navigateTo2(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }
    navigateTo(route) {
        this.props.closeDrawer();

        if (route == 'home'){

                this.props.replaceOrPushRoute('home');
        }

        else{


            if (this.props.is_driver_verified){
                this.props.replaceOrPushRoute('driverHome');
            }

            else{
                this.props.replaceOrPushRoute('DriverSignup');
            }
        }
    }

    logUserOut = () =>{
        AsyncStorage.multiRemove(['token','userId']);
    }
    resetRoute(route) {
        this.props.closeDrawer();
        this.logUserOut();

        this.props.resetRoute(route);
    }
   replaceRoute(route){
    this.props.closeDrawer();

    this.props.replaceRoute(route);
   }
    
    render(){
        return (
            <View style={{flex: 1,backgroundColor: '#19192B'}}>
                
                    <Content style={Platform.OS === 'android' ? styles.adrawerContent : styles.drawerContent}>{this.props.userImage && 

                        <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>

                        
                        
                           <Image style={styles.image} source={{ uri: this.props.drivers_license_image_thumb_url }} /> 
                        

                            

                        </View>}

                        
                    	<List  foregroundColor={'white'} style={styles.profile}>
                            <ListItem button onPress={() => this.navigateTo2('settings')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-person' />
                                <Text style={styles.linkText} >{this.props.first_name}</Text>
                            </ListItem>
                        </List>
                        <List  foregroundColor={'white'} style={styles.Bg} >
                            <ListItem button onPress={() => this.navigateTo2('home')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-home'  style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText} >Home</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo2('history')}  iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-keypad-outline'  style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText}>History</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo2('notifications')}  iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-notifications' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText}>Promo Codes</Text>
                            </ListItem>
                            
                           
                            <ListItem button onPress={() => this.navigateTo2('payment')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-card'  style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText} >Payment</Text>
                            </ListItem>
                             <ListItem button onPress={() => this.resetRoute('login')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-power' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={[styles.linkText,{fontWeight: '700'}]}>SIGN OUT</Text>
                            </ListItem>



                            <ListItem button onPress={() => this.navigateTo('DriverSignup')} 



                            iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-car' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={[styles.linkText,{fontWeight: '700'}]}>Driver App</Text>
                            </ListItem>
                        </List>
                 
                    </Content>
                    
            </View>
        )
    }
}




function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

function mapStateToProps(state) {

    console.log("maptostateSidebarrrr:");
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
    is_driver_verified: state.route.users.is_driver_verified,
    drivers_license_image_thumb_url: state.route.users.drivers_license_image_large_url,
    userImage: imageExists,

    
  }
    }
 

    else{
  return {
    first_name: "first Name",
    last_name: "lastname",
    email: "emaol",
    phone_no: "phone number",
    
  }
}


}
export default connect(mapStateToProps, bindAction)(SideBar);





