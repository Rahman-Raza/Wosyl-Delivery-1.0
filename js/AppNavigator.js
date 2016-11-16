/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash/core';
import {Drawer} from 'native-base';
import {BackAndroid, Platform, StatusBar} from 'react-native';
import {closeDrawer} from './actions/drawer';
import {popRoute} from './actions/route';
import Navigator from 'Navigator';
import PhoneVerify from './components/rider/PhoneVerify/'
import Login from './components/rider/login/';
import SignIn from './components/rider/signIn/';
import Register from './components/rider/register/';
import DriverSignup from './components/rider/DriverSignup/';
import Home from './components/rider/home/';
import CreatePickup from './components/rider/createPickup/';
import PlaceOrder from './components/rider/placeOrder/';
import InSession from './components/rider/inSession/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/rider/sideBar';
import Payment from './components/rider/payment';
import History from './components/rider/history';
import Notifications from './components/rider/notifications';
import Settings from './components/rider/settings';
import CardPayment from './components/rider/cardPayment';
import CreditCard from './components/rider/creditCard';
import ConfirmRide from './components/rider/confirmRide';
import RideBooked from './components/rider/rideBooked';
import Receipt from './components/rider/receipt';
import RideRequest from './components/driver/rideRequest';
import PickRider from './components/driver/pickRider';
import StartRide from './components/driver/startRide';
import DropOff from './components/driver/dropOff';
import DriverHome from './components/driver/driverHome';

import RateRider from './components/driver/rateRider';
import LoadingOverlay from './components/rider/LoadingOverlay';
import { statusBarColor } from "./themes/base-theme";


Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        // console.log("ACTION:", action);
        var currentState = state;

        if(currentState){
          while (currentState.children){
            currentState = currentState.children[currentState.index]
          }
        }

        return defaultReducer(state, action);
    }
};

const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};
class AppNavigator extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        // console.log(global.globalNav, "global nav");

        this.props.store.subscribe(() => {
            // console.log("store changed", this.props.store.getState());
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close();
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();

            if(routes[routes.length - 1].id == 'login' || routes[routes.length - 1].id == 'home') {
                // CLose the app
                return false;
            }
            else {
                this.popRoute();
                return true;
            }

        });
    }

    popRoute() {
        this.props.popRoute();
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<SideBar navigator={this._navigator} />}
                tapToClose={true}
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}>
                <StatusBar
                    backgroundColor={statusBarColor}

                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    initialRoute={{id: (Platform.OS === "android") ? 'splashscreen' : 'login', statusBarHidden: true}}
                    renderScene={this.renderScene}                    
                  />
            </Drawer>
        );


    }

    renderScene(route, navigator) {
        if(route.component) {
            var Component = route.component;
            return (
                <Component navigator={navigator} route={route} {...route.passProps} />
            );
        }
        switch (route.id) {
            case 'splashscreen':
                return <SplashPage navigator={navigator} />;
            case 'home':
                return <Home navigator={navigator} />;
            case 'sideBar':
                return <SideBar navigator={navigator} />;
            case 'payment':
                return <Payment navigator={navigator} />;
            case 'cardPayment':
                return <CardPayment navigator={navigator} />;
            case 'settings':
                return <Settings navigator={navigator} />;
            case 'history':
                return <History navigator={navigator} />;
            case 'notifications':
                return <Notifications navigator={navigator} />;
            case 'creditCard':
                return <CreditCard navigator={navigator} />;
            case 'confirmRide':
                return <ConfirmRide navigator={navigator} />;
            case 'rideBooked':
                return <RideBooked navigator={navigator} />;
            case 'receipt':
                return <Receipt navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'signIn':
                return <SignIn navigator={navigator} />;
            case 'register':
                return <Register navigator={navigator} />;
            case 'DriverSignup':
                return <DriverSignup navigator={navigator} />;
            case 'rideRequest':
                return <RideRequest navigator={navigator} />;
            case 'pickRider':
                return <PickRider navigator={navigator} />;
            case 'startRide':
                return <StartRide navigator={navigator} />;
            case 'dropOff':
                return <DropOff navigator={navigator} />;
            case 'driverHome':
                return <DriverHome navigator={navigator} />;
            case 'rateRider':
                return <RateRider navigator={navigator} />;
            case 'PhoneVerify':
                return <PhoneVerify navigator={navigator} />;
            case 'LoadingOverlay':
                return <LoadingOverlay navigator={navigator} />;
            case 'createPickup':
                return <CreatePickup navigator={navigator} />;
            case 'placeOrder':
                return <PlaceOrder navigator={navigator} />;
             case 'inSession':
                return <InSession navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

const mapStateToProps = (state) => {
  return {
    drawerState: state.drawer.drawerState
  }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);
