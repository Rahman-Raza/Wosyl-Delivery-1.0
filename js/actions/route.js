/**
 * Created by kylefang on 4/30/16.
 * @flow
 */

'use strict';
import type {Action} from './types'

export const PUSH_NEW_ROUTE = "PUSH_NEW_ROUTE";
export const REPLACE_ROUTE = "REPLACE_ROUTE";
export const REPLACE_OR_PUSH_ROUTE = "REPLACE_OR_PUSH_ROUTE";
export const POP_ROUTE = "POP_ROUTE";
export const RESET_ROUTE = "RESET_ROUTE";
export const POP_TO_ROUTE = "POP_TO_ROUTE";
export const SET_USER = 'SET_USER';
export const CREATE_PICKUP = "CREATE_PICKUP";
export const CREATE_SESSION = "CREATE_SESSION";


export function replaceRoute(route:string, userDetail):Action {
  return {
    type: REPLACE_ROUTE,
    route: route,
    userDetail: userDetail,
  }
}

export function createPickup(route:string, pickup: object):Action {
  return {
    type: CREATE_PICKUP,
    route: route,
    pickup: pickup,
  }

}

export function createSession(route:string, pickup: object):Action {
  return {
    type: CREATE_SESSION,
    route: route,
    pickup: pickup,
  }

}

export function setUser(user:object):Action {
  return {
    type: SET_USER,
    user: user,
  }
}


export function signIn(email,password):Action {
  return {
    type: "SIGNIN",
    email :email,
    password: password
  }
}
export function pushNewRoute(route:string):Action {
  return {
    type: PUSH_NEW_ROUTE,
    route: route
  }
}

export function replaceOrPushRoute(route:string):Action {
  return {
    type: REPLACE_OR_PUSH_ROUTE,
    route: route
  }
}

export function popRoute():Action {
    return {
        type: POP_ROUTE
    }
}

export function popToRoute(route:string):Action {
  return {
    type: POP_TO_ROUTE,
    route: route
  }
}
export function resetRoute(route: string):Action {
    return {
        type: RESET_ROUTE
    }
}