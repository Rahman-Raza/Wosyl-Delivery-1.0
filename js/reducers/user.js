
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    users: Object
}

const initialState = {

  
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
  	console.log("Payload:");
  	console.log(action.payload);
    return {
      ...state,
      users: action.payload,
    };
  }
  return state;
}
