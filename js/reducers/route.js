/**
 * Created by kylefang on 4/30/16.
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';
import {globalNav} from '../AppNavigator';
import { PUSH_NEW_ROUTE, RESET_ROUTE, POP_ROUTE, POP_TO_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE,SET_USER,CREATE_PICKUP,CREATE_SESSION } from '../actions/route';
import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  routes: Array<string>,
  users: Object,
  pickup: Object,
}

const initialState = {
  routes: ['login'],
  name: '',
};

export default function (state:State = initialState, action:Action): State {

if (action.type === SET_USER) {
    console.log("Payload:");
    console.log(action.user);
    return {
     
      users: action.users,
    };
  }

  if (action.type === CREATE_PICKUP) {
    globalNav.navigator.push({id: action.route});
    let pickup = action.pickup;

   
    return {
      ...state,
      pickup: pickup,
     
    };
}

if (action.type === CREATE_SESSION) {
    globalNav.navigator.push({id: action.route});
    let pickup = action.pickup;

   
    return {
      ...state,
      pickup: pickup,
     
    };
}

  if (action.type === PUSH_NEW_ROUTE) {
    
    globalNav.navigator.push({id: action.route});
    
  
    return {
     
    };
  }
  if (action.type === RESET_ROUTE) {
        globalNav.navigator.resetTo({id: 'login'});
        return {
           
        }
    }
  if (action.type === REPLACE_ROUTE) {
    
    globalNav.navigator.push({id: action.route});
  
    
    //let first_name = action.userDetail.first_name;
   
    
    // console.log("CHECKINGUSERS");
    // console.log(users);



 let users = action.userDetail;

    return {
      users: users
    };
  }

  // For sidebar navigation
  if (action.type === REPLACE_OR_PUSH_ROUTE) {
    
   
    
    
    // if(routes[routes.length - 1] == 'home') {
    //   // If top route is home and user navigates to a route other than home, then push
      if(action.route != 'home')
        globalNav.navigator.push({id: action.route});
      else
         globalNav.navigator.resetTo({id: 'home'});

      // If top route is home and user navigates to home, do nothing
     
    // }

    // else {
      // if(action.route == 'home') {
      //   globalNav.navigator.resetTo({id: 'home'});
      //   routes = [];
      // }
      // else {
      //   globalNav.navigator.replaceWithAnimation({id: action.route});
      //   routes.pop();
      // }
      

    
    

    return {
    ...state
      
    };
  }

  if (action.type === POP_ROUTE) {
    globalNav.navigator.pop();
    //let first_name = state.first_name;
  
    return {
     ...state
    };
  }

  if (action.type === POP_TO_ROUTE) {
    globalNav.navigator.popToRoute({id: action.route});
    //let first_name = state.first_name;
  
    return {
    ...state
    };
  }

  if (action.type === REHYDRATE) {
    const savedData = action['payload']['route'] || state;
    return {
      ...savedData
    };
  }

  return state;
}