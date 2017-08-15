export function spinnerVisible(){

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
                                    <View style={{marginTop: 250, alignItems: 'center',marginBottom:120,backgroundColor: '#000', opacity: .8 }} >
                
                 
                    <Spinner style={{marginRight: 20}} isVisible={true} size={100} type={'Circle'} color={"#3DA000"}/>
                                   
                                       
                                          <Text style={{fontSize: 20, marginTop:30, marginBottom: 10, color: '#fff'}}>Looking for Driver...</Text>

                                           <View>

                                              <CountDownText
                                                  style={{textAlign: 'center',color: 'white',fontSize: 20}}
                                                  countType='seconds' // 计时类型：seconds / date 
                                                  auto={true} // 自动开始 
                                                  afterEnd={() => {this.setState({spinnerVisible:false}) }} // 结束回调 
                                                  timeLeft={120} // 正向计时 时间起点为0秒 
                                                  step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时 
                                                  startText= ''// 开始的文本 
                                                  endText= ''// 结束的文本 
                                                  intervalText= {(sec) => '' }/>
                                              </View>
                                            
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                                                      <Button rounded block style={{marginLeft: 30, marginRight:30, borderColor:'#fff'}} onPress={() => this.CancelOrder()} >

                                                        <Text style={{fontWeight: '600',color: '#fff'}}>Cancel Order</Text>
                                                      </Button>
                                            </View>

                                         

                                                   
                                                                                      
                                           
                                          
                                       
                                    
                                </View>
                                </View>)}