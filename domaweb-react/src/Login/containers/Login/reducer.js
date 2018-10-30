/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SESSION_INFO,
  FORMAT_STATE,
  SET_PHASE,
  SET_STEP,
  SET_MESSAGE,
  REGISTER_SRP_STEP1,
  REGISTER_SRP_STEP2,
  REGISTER_SRP_STEP3,
  USER_CREDENTIALS,
  LOGIN_ERROR,
  LOGIN_ERROR_DISMISS,
} from './constants';

const initialState = fromJS({
  error: false,
  errorMessage: null,
  step: null,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_INFO:
      return state.set('session', action.session);
    case FORMAT_STATE:
      return state.set('state', action.state);
    case SET_PHASE: 
      return state.set('phase', action.phase);
    case SET_STEP:
      return state.set('step', action.step);
    /*case REGISTER_SRP_STEP1:
      return state.set('step', 1);
    case REGISTER_SRP_STEP2:
      return state.set('step', 2);
    case REGISTER_SRP_STEP3:
      return state.set('step', 3);*/
    case USER_CREDENTIALS:
      return state.set('user', action.credentials);
    case LOGIN_ERROR: 
      return state
        .set('error', fromJS(true))
        .set('errorMessage', fromJS(action.data))
        .set('errorCode', fromJS(action.code));
    case LOGIN_ERROR_DISMISS:
      return state
        .set('error', fromJS(false))
        .set('errorMessage', fromJS(null));
    default:
      return state;
  }
}

export default loginReducer;
