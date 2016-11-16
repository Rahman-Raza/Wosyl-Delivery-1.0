                  //   fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/login.json', {
                                                    //   method: 'POST',
                                                    //   headers: {
                                                    //     'Accept': 'application/json',
                                                    //     'Content-Type': 'application/json',
                                                    //     'X-Auth-Token': '587a895e216fefe49218f651b1bd16f5',
                                                    //   },
                                                    //   body: JSON.stringify({
                                                        
                                                    //     email: this.state.email,
                                                    //     password: this.state.password,
                                                    //   })
                                                    // }) .then((response) => response.json())
                                                    //       .then((responseJson) => {
                                                    //         if (responseJson.success){

                                                    //            this.setState({userDetail: responseJson.user});
                                                              

                                                    //             if(responseJson.user.is_phone_verified ){
                                                    //                 this.setState({is_driver_verified:responseJson.user.is_driver_verified});
                                                    //                  console.log("USER DETAILS:")
                                                    //            console.log(this.state);
                                                                   
                                                    //              this.replaceRoute('home',this.state.userDetail);
                                                    //             }

                                                    //              else{
                                                    //                 this.state ={
                                                    //                   is_activated: responseJson.user.is_activated,
                                                                      
                                                                      
                                                    //                 };

                                                    //                 if(this.state.is_activated){


                                                    //                 this.replaceRoute('PhoneVerify')
                                                    //                 }
                                                    //             }
                                                    //         }

                                                    //         else{
                                                    //             this.setState({open: true});
                                                    //             this.setState({email:''});
                                                    //             this.setState({password:''})



                                                    //         }
                                                    //       })
                                                    //       .catch((error) => {
                                                    //         console.error(error);
                                                    //       })