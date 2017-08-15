export function confirmPickup2(){

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
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>


                                    <Modal
                                       offset={-100}
                                       overlayBackground={'rgba(0, 0, 0, 0.55)'}
                                       closeOnTouchOutside={true}
                                       open={this.state.pickupDetailError}
                                       modalDidOpen={() => console.log('modal did open')}
                                       modalDidClose={() => this.setState({pickupDetailError: false, confirmPickup: true})}
                                       style={{alignItems: 'center'}}>
                                       <View>
                                          <Text style={{fontSize: 20, marginBottom: 10}}>Please check your order details and Try again.</Text>
                                          
                                          <TouchableOpacity
                                             style={{margin: 5}}
                                             onPress={() => this.setState({pickupDetailError: false})}>
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
                                       modalDidClose={() => this.setState({paymentError: false,  confirmPickup: true})}
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
                                       style={{alignItems: 'center', marginBottom:150}}>
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

                                             <Button rounded bordered block style={{marginLeft: 30, marginRight:30,marginTop:10,  backgroundColor: '#48BBEC',
                                                    borderColor: '#48BBEC',}} onPress={() => {
                   
                                                        this.goBack3(); }}  
                                                        underlayColor='#99d9f4'>
                                                <Text style={styles.buttonText}>Go Back</Text>
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
                                </View>)}