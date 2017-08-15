export function secondOptions(){

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

                                            <View style={{marginTop: 20}}>
               
                       
               
                     
                        <View style={{padding: 10}}>
                       
                           <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input  onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder="Item"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                        </View>

                       

                        <View style={{padding: 10,}}>
                       <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input keyboardType="phone-pad" onChangeText={(text) => this.setState({contactNumber:text})} value={this.state.contactNumber}placeholder="Contact Number"  placeholderTextColor="#000" />




                            </InputGroup>
                            
                        </View>



                        <View style={{padding: 10, paddingBottom: this.state.visiblePadding}}>
                      

                             <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30, color:'#000', backgroundColor:'#fff'}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder="Notes"  placeholderTextColor="#000" />
                            </InputGroup>
                            
                            
                            
                        </View>
                        
                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 70, marginRight:70,marginTop: 10, borderColor:'#fff'}} onPress={() => {this.sendPickup()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Next</Text>
                          </Button>
                        </View>

                        <View style={{padding: 10}}>
                          <Button rounded  block style={{marginLeft: 70, marginBottom: 30, marginRight:70, borderColor:'#fff'}} onPress={() => {this.goBack()}}
                          underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Back</Text>
                          </Button>
                        </View>
                        
                     </View>
                     </View>)}
