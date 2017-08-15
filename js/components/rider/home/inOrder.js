export function inOrder(){

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
                                    <Container style={{marginTop:125}}>
                <Content style={{ opacity: .8}}>
                    <Card>
                        <CardItem style={{alignItems: 'center'}}>
                            
                            <Text>Your Driver: {this.state.driver_name}</Text>
                             <Text onPress={() => this.callDriver()}>Phone Number: {this.state.driver_phone_number}</Text>

                            
                        </CardItem>

                        <CardItem style={{alignItems: 'center'}}>
                            <Image style={{justifyContent: 'center',
                                            width: 150,
                                            height: 150,
                                            margin: 10,
                                             borderRadius: 75,marginLeft:100}} source={{uri: this.state.driver_image}} />
                        </CardItem>
                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.callDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Call Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>

                         <CardItem style={{alignItems: 'center'}}>
                            <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.textDriver()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Text Driver</Text>
                                                      </Button>
                            
                            
                            
                        </CardItem>



                        <CardItem>
                            <Grid>  
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Col style={{padding: 10,alignItems: 'center'}}>{(!this.state.pickedUP && !this.state.droppedOff)&&<Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}>Your Driver is on his way!</Text>}{this.state.pickedUP && <Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}> Your Driver has picked up your order</Text>}{this.state.droppedOff &&
                          <Text style={{fontWeight: '600',color: '#000', opacity: .99, marginTop:20}}> Your driver is here with your order, thank you for using Wosyl! </Text>}{this.state.droppedOff && <Button style={{marginLeft:100,marginTop:10}}rounded onPress={() => this.completeOrder()} >
                          <Text style={{fontWeight: '800',color: '#000'}}>Comment and Rate</Text>
                          </Button>}</Col>
                        </View>
                            </Grid>
                        </CardItem>
                   </Card>
                </Content>
            </Container>
            </View>)}