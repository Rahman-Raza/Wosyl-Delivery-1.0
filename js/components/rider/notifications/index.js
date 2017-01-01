'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Dimensions, Platform } from 'react-native';

import { replaceRoute,popRoute} from '../../../actions/route';

import { Container, Header, Content, Text, Button, Icon, Card, CardItem } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Notifications extends Component {
    
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
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
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderText : styles.aHeaderText}>Notifications</Text>
                        
                    </Header>
                    <Content style={styles.container}>
                        
                            <Text style={styles.contentHeading}> 
                                These restuanrants use Wosyl
                            </Text>
                            <View style={{padding: 20}}>
                                <Card>
                                    <CardItem style={{padding: 3}}>
                                        <Image source={require('../notifications/volare.png')} style={styles.notCard} />
                                    </CardItem>
                                   <CardItem style={{padding: 3}}>
                                    <Text style={styles.contextText}> 
                                        456 Haight st San Francisco, CA
                                    </Text>
                                 </CardItem>

                                </Card>
                            </View>
                            
                    </Content>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(Notifications);
