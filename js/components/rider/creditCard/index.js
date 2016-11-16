'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,Platform } from 'react-native';

import { popRoute, replaceRoute } from '../../../actions/route';

import { Container, Header, Content, Text, Button, Icon, Card, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class CreditCard extends Component {
    constructor(props){
    super(props);
    this.state = {
      cca2: 'AI'
    };
    }
    
    
    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
     
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle }>Add Payment</Text>
                        
                    </Header>
                    <Content style={{padding: 20}}>
                        <View>
                            <InputGroup style={{borderBottomColor: '#24BCD9'}}>
                                <Icon name='ios-card' style={{color: '#797979'}} />
                                <Input placeholder='Credit Card Number' placeholderTextColor='#797979' />
                            </InputGroup>
                        </View>
                            <Grid style={{paddingVertical: 10}}>
                                <Col style={styles.payCardInput}>
                                    <InputGroup style={{borderBottomColor: '#797979'}}>
                                        <Input placeholder='MM' placeholderTextColor='#797979' />
                                    </InputGroup>
                                </Col>
                                <Col style={styles.payCardInput}>
                                    <InputGroup style={{borderBottomColor: '#797979'}}>
                                        <Input placeholder='YY' placeholderTextColor='#797979' />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup style={{borderBottomColor: '#797979'}}>
                                        <Input placeholder='CVV' placeholderTextColor='#797979' />
                                    </InputGroup>
                                </Col>
                            </Grid>
                            
                            <Button block style={{backgroundColor: '#19192B'}} >
                            <Text style={{color: '#fff',fontWeight: '600'}}>ADD PAYMENT</Text>
                            </Button>
                    </Content>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(CreditCard);
