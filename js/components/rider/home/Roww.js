import React from 'react';
import { View, StyleSheet, Image, Linking } from 'react-native';
import {Container, Header, Content, Text, Button, Icon,Thumbnail, Card, CardItem, Title } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  detailContainer: {
    borderWidth: 0,
    padding: 10
  },
  driverImage: {
    borderRadius: 20,
    marginTop: 3
  },
  cashText: {
    alignSelf: 'flex-end',
    marginTop: -40
  },
});

const Roww = (props) => { 


console.log("check the props", props);
function callDriver(){ 


var url = 'tel: '+'15105555555';
      console.log("checking apple route for phone call",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}

function textDriver(){ 


var url = 'sms: '+'1510555555';
      console.log("checking apple route for phone call",url);

    Linking.openURL(url).catch(err => console.error('An error occurred', err));




}

  if (props.item_pickedup) 
  return (
  <View style={styles.container}>
  

     <Card style={{position:'relative'}}>
                                          <CardItem style={{alignItems: 'center'}}>
                                <Thumbnail square source={{uri: "https://previews.123rf.com/images/racorn/racorn1308/racorn130805649/21341221-Profile-portrait-of-a-charming-young-business-woman-being-happy-and-smiling-in-an-office-setting--Stock-Photo.jpg"}} size={40} style={styles.driverImage} />
                            
                            <Text>Your Driver: Kimberly</Text>
                             <Text onPress={() => callDriver()}>Phone Number: 510-555-555</Text>

                            
                        </CardItem>

                                
                                 <CardItem style={styles.detailContainer}>
                                    
                                    <Text note style={{color:'#000'}}>From : {props.pickup_from}</Text>
                                    <Text note style={{color:'#000'}}>To : {props.pickup_to}</Text>
                                    <Text note style={{color:'#000'}}>Item : {props.item}</Text>
                                    <Text note style={{color:'#000'}}>Notes : {props.notes}</Text>
                                   <Text note style={{color:'#000'}}>Status: Driver has picked up item </Text>
                                  
                                </CardItem>

                        

                     
                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => callDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Call Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>

                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => textDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Text Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>

                                <View style={styles.dummyView} />
                            </Card>
  </View>
)

else return(<View style={styles.container}>
  

     <Card style={{position:'relative'}}>
             <CardItem style={{alignItems: 'center'}}>
                                <Thumbnail square source={{uri: "https://previews.123rf.com/images/racorn/racorn1308/racorn130805649/21341221-Profile-portrait-of-a-charming-young-business-woman-being-happy-and-smiling-in-an-office-setting--Stock-Photo.jpg"}} size={40} style={styles.driverImage} />
                            
                            <Text>Your Driver: Kimberly</Text>
                             <Text onPress={() => callDriver()}>Phone Number: 510-555-555</Text>

                            
                        </CardItem>
                                
                                 <CardItem style={styles.detailContainer}>
                                    
                                    <Text note style={{color:'#000'}}>From : {props.pickup_from}</Text>
                                    <Text note style={{color:'#000'}}>To : {props.pickup_to}</Text>
                                    <Text note style={{color:'#000'}}>Item : {props.item}</Text>
                                    <Text note style={{color:'#000'}}>Notes : {props.notes}</Text>
                                   <Text note style={{color:'#000'}}>Status: Driver is en route to pickup item </Text>
                                  
                                </CardItem>

                               

                       
                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => callDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Call Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>

                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => textDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Text Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>
                                <View style={styles.dummyView} />
                            </Card>
  </View>)}

export default Roww;