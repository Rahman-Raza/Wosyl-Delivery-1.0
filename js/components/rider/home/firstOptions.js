 export function firstOptions(){

  return(

 <View style={styles.container}>
                  <StatusBar barStyle='light-content' networkActivityIndicatorVisible='true' />
                  <Content theme={theme}>
                  </Content>

                  <View style={styles.map}>
                        {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
                            style={styles.map}
                             styleURL={Mapbox.mapStyles.dark}   
                            rotateEnabled={true}
                            zoomEnabled={true}
                            showsUserLocation={true}
                            attributionButtonIsHidden = {false}
                            logoIsHidden = {true}
                            compassIsHidden = {true}
                            accessToken={'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw'}
                            initalZoomLevel = {13}
                            centerCoordinate={this.state.center}
                            userLocationVisible={true}
                            userTrackingMode = {Mapbox.userTrackingMode.follow}
                            annotations={this.state.annotations}
                            annotationsAreImmutable
                            onFinishLoadingMap = {this.onFinishLoadingMap}
                            
                            
                            debugActive={false}
                            direction={this.state.direction}
                            
                            
                            onOpenAnnotation={this.onOpenAnnotation}
                            onUpdateUserLocation={this.onUpdateUserLocation}/>)
                        : <View />
                        }
                    </View>
                    
                  <View style={styles.headerContainer}>
                       <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                           <Button transparent  onPress={ this.props.openDrawer

                           } >
                               <Icon name='ios-menu' />
                           </Button>{!this.props.is_driver_verified && <Title style={{marginTop:15, marginRight:10}}> <Image style={{marginRight:18, marginTop: 15}} source={require('../home/half1.png')}></Image></Title>}</Header>
                    
                     </View>{this.props.is_driver_verified &&
                            <View style={{justifyContent: 'center', alignItems: 'center',position: 'absolute', top:20,left: 140}}> 
                        <Switch
                          onValueChange={(value) => this.driverModeSwitch()}
                          style={{marginBottom: 10}}
                          value={false} />
                          <Text style={{color:'#fff'}}>Driver Mode</Text>
                        
                      </View>}{!this.props.is_driver_verified &&
                           <View style={{justifyContent: 'center', alignItems: 'center',position: 'absolute', top:20, left: 260}}> 
                        <Button transparent  onPress={ this.props.openDrawer} >
                               
                               <Text style={{color:'#fff'}}>Current Order</Text>
                        </Button>
                          
                        
                      </View>}<Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.open}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({open: false})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                       <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({open: false})}>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please enter a pickup location and destination</Text>
                                          
                                          
                                             
                                          </TouchableOpacity>
                                       </View>
                                    </Modal>

                                     <View style={{padding: 10}}>
                        
       
                   
 
                       
                           <GooglePlacesAutocomplete
                           
                                placeholder= {this.state.fromLocation}
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                

                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  console.log("checking details.name", details.name);
                                  if (details.name){
                                    this.setState({fromLocation:details.name});
                                  }
                                  else{
                                    console.log("checking google details", details);
                                    this.setState({fromLocation: this.props.first_name+" 's"+" Current Location"});

                                  }
                                  this.setState({fromLatitude:details.geometry.location.lat});
                                  
                                  this.setState({fromLongtitude:details.geometry.location.lng});
                                  console.log("checking from long");
                                  console.log(this.state.fromLatitude,this.state.fromLongtitude);
                                  this.setState({ fromCoordinates: [parseFloat(details.geometry.location.lat),parseFloat(details.geometry.location.lng) ]});
                                  
                                  console.log("checking parseFloat:");
                                  console.log(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng));
                                  
                                  this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng),13);
                                  this.setState({ annotations: [{
                                                          coordinates: this.state.fromCoordinates,
                                                          type: 'point',
                                                          title: this.state.fromLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a5f87e60f.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 50, // required. number. Image height
                                                                width: 50, // required. number. Image width
                                                              },
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker1'
                                                        }]});
                                  
                                  

                                  



                                }}
                                getDefaultValue={() => {
                                  return ''; // text input default value
                                }}
                                query={{
                                  // available options: https://developers.google.com/places/web-service/autocomplete
                                  key: 'AIzaSyCx4LyiTDnAAgJLnSeVSVKR3uAQPsslXxg',
                                  language: 'en', // language of the results
                                  
                                }}
                                 styles={{
                                  textInputContainer: {
                                    backgroundColor: '#fff',
                                    borderTopWidth: 1,
                                    borderBottomWidth:1,
                                     borderRadius: 20,
                                     borderColor: '#000',
                                     borderLeftColor: '#000',
                                     borderRightColor: '#000',
                                     borderTopColor: '#000',
                                     borderBottomColor: '#000',
                                     borderLeftWidth: 1,
                                     borderRightWidth: 1,
                                     color: 'black',

                                  },

                                  textInput: {
                                  backgroundColor: '#fff',
                                  color: 'black',
                                  
                                  },
                                  
                                  
                                  description: {
                                     backgroundColor: '#fff',
                                    fontWeight: 'bold',
                                  },
                                  predefinedPlacesDescription: {
                                    color: '#1faadb',
                                  }, 
                                  listView:{
                                    backgroundColor: '#fff',
                                  },
                                  poweredContainer: {
                               
                                    borderRadius: 30,

                                  },
                                  container:{
                                    
                                     borderRadius: 30,
                                     borderRightRadius: 25,
                                     borderLeftRadius: 25,
                                     borderBottomRadius: 25,
                                     flex: 3,
                                     marginLeft: 30, marginRight:30,

                                  
                                },
                              }}
                                enablePoweredByContainer = {false}
                                  // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                  rankby: 'distance',
                                  types: 'food',
                                }}

                                predefinedPlaces={[this.state.currentLocation]}
                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                            </GooglePlacesAutocomplete>

                              
                            
                        </View>
                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                       
                            <GooglePlacesAutocomplete
                                placeholder= {this.state.toLocation}
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                
                               
                                onPress={(data, details = null) => { 
                                  console.log("googleplaces");
                                  console.log(details);
                                  if (details.name){

                                    this.setState({toLocation:details.name});
                                  }
                                  else{
                                    
                                    this.setState({toLocation:'Current Location'});
                                  }
                                  
                                  this.setState({toLatitude:details.geometry.location.lat});
                                  this.setState({toLongtitude:details.geometry.location.lng});
                                   this.setState({ toCoordinates: [parseFloat(details.geometry.location.lat),parseFloat(details.geometry.location.lng) ]});
                                   if (details.name == 'Current Location'){
                                    this.setState({usedCurrentLocation: true});
                                  }
                                  console.log("checking parseFloat:");
                                  console.log(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng));

                                  if(this.state.fromLocation){
                                  
                                  this._map && this._map.setVisibleCoordinateBounds(parseFloat(this.state.fromLatitude), parseFloat(this.state.fromLongtitude), parseFloat(this.state.toLatitude), parseFloat(this.state.toLongtitude), 100, 100, 100, 100);
                                   this.drawRoute();

                                 }

                                 else{
                                  this._map && this._map.setCenterCoordinateZoomLevel(parseFloat(details.geometry.location.lat), parseFloat(details.geometry.location.lng),13);

                                  this.setState({ annotations: [{
                                                          coordinates: this.state.toCoordinates,
                                                          type: 'point',
                                                          title: this.state.toLocation,
                                                          fillAlpha: 1,
                                                          fillColor: '#000000',
                                                          strokeAlpha: 1,
                                                           annotationImage: { // optional. Marker image for type=point
                                                                source: {
                                                                 uri: "https://i.imgsafe.org/4a5f87e60f.png", // required. string. Either remote image URL or the name (without extension) of a bundled image
                                                                },
                                                                height: 50, // required. number. Image height
                                                                width: 50, // required. number. Image width
                                                              },
                                                          subtitle: 'It has a rightCalloutAccessory too',
                                                          // rightCalloutAccessory: {
                                                          //   source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
                                                          //   height: 50,
                                                          //   width: 50
                                                          // }, 
                                                          id: 'marker3'
                                                        }]});
                                 }
                                
                                this._map && this._map.selectAnnotation("marker1",false);
                                this._map && this._map.selectAnnotation("marker2",false);
                                  }}
                                getDefaultValue={() => {
                                  return ''; // text input default value
                                }}
                                query={{
                                  // available options: https://developers.google.com/places/web-service/autocomplete
                                  key: 'AIzaSyCx4LyiTDnAAgJLnSeVSVKR3uAQPsslXxg',
                                  language: 'en', // language of the results
                                  
                                }}
                                styles={{
                                  textInputContainer: {
                                    backgroundColor: '#fff',
                                    borderTopWidth: 1,
                                    borderBottomWidth:1,
                                     borderRadius: 20,
                                     borderColor: '#000',
                                     borderLeftColor: '#000',
                                     borderRightColor: '#000',
                                     borderTopColor: '#000',
                                     borderBottomColor: '#000',
                                     borderLeftWidth: 1,
                                     borderRightWidth: 1,
                                     color: 'black',

                                  },

                                  textInput: {
                                  backgroundColor: '#fff',
                                  color: 'black',
                                  
                                  },
                                  
                                  
                                  description: {
                                     backgroundColor: '#fff',
                                    fontWeight: 'bold',
                                  },
                                  predefinedPlacesDescription: {
                                    color: '#1faadb',
                                  }, 
                                  listView:{
                                    backgroundColor: '#fff',
                                  },
                                  poweredContainer: {
                                
                                    borderRadius: 30,

                                  },
                                  container:{
                                    
                                     borderRadius: 30,
                                     borderRightRadius: 25,
                                     borderLeftRadius: 25,
                                     borderBottomRadius: 25,
                                     flex: 3,
                                     marginLeft: 30, marginRight:30,

                                  
                                },
                              }}

                                enablePoweredByContainer = {false}
                                  // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                  rankby: 'distance',
                                  types: 'food',
                                }}

                                predefinedPlaces={[this.state.currentLocation]}
                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  > 
                                
                            </GooglePlacesAutocomplete>
                            
                        </View>
                          <View style={{padding: 10}}>


                        <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff', marginBottom:10}}  onPress={() => {
                                       if (this.state.fromLatitude == 0 ){
                                           
                                        this.state.fromLatitude =  this.state.position.coords.latitude;
                                        this.state.fromLongtitude =  this.state.position.coords.longitude;
                                        console.log(this.state.fromLatitude);
                                     }

                                     console.log("checking center");   
                                       console.log(this.state.center);   
                                     this.createPickup();
                                     this.reDrawMap();

                                   
                                      
                                  }
                               }>
                               <Text style={styles.buttonText}>Continue</Text>
                        </Button>

                        
                        </View>
                        </View>
                      )}


                        