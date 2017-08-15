export function confirmPickup(){

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
                                    <View style={{paddingBottom: 150}}>
                   
                   
                    
                    <Text style={styles.buttonText2}>Order Details</Text>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>From: {this.state.fromLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>To: {this.state.toLocation}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Item: {this.state.itemPickup}</Text>
                    </View>

                     <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Notes: {this.state.notes}</Text>
                    </View>

                    <View style={{padding: 10}}>

                    <Text style={{marginLeft: 30, marginRight:30, color:'#fff'}}>Estimated cost: $3 Base Fee + {this.state.delivery_distance} miles x $1 per mile = ${this.state.cost}</Text>
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

                  <Button rounded bordered block style={{marginLeft: 30, marginRight:30,marginTop:10,  backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',}} onPress={() => {
                   
                    this.goBack2();


                    
                                                          


              
            }}  underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Go Back</Text>
                  </Button>


                 
                    </View>
                    </View>)}
