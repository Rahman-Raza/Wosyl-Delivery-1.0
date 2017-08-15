export function orderCompleted(){

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

                                    <Container style={{marginTop:225}}>
                <Content style={{ opacity: .9}}>
                    <Card>
                        <CardItem style={{alignItems: 'center'}}>
                            
                            <Text>Please Rate your Driver {this.state.first_name}</Text>
                            
                        </CardItem>

                        <CardItem>
                            <Grid>  
                        
                        <Col style={{padding: 10,alignItems: 'center'}}>
                        <TextInput
                                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                editable = {true}
                                maxLength = {140}
                                multiline = {true}
                                placeholder= 'Please comment on your delivery'
                                style={{height: 60, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(text) => this.setState({ratingText: text})}
                                value={this.state.ratingText}/>
                         
                        </Col>
                        
                            </Grid>
                        </CardItem>

                        <CardItem>
                            <Grid>  
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Col style={{padding: 10,alignItems: 'center'}}>
                      
                         <StarRating 
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starColor={'#3DA000'}/>


                                <Button style={{marginLeft: 40, marginTop:10}} rounded onPress={() => this.submitRating()} >
                          <Text style={{fontWeight: '600',color: '#fff'}}>Submit Review</Text>
                          </Button>
                        </Col>
                        </View>
                            </Grid>
                        </CardItem>
                   </Card>
                </Content>
            </Container>
            </View>)}