/*
 *
 * AuthRequired reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHECK_LOGIN_STATUS,
  NOT_LOGGED_IN,
  LOGGED_IN,
  LOAD_PRIVILEGES,
  STORE_USER_INFO,
  STORE_PREVIOUS_STATE,
} from './constants';

const initialState = fromJS({
  userInfo: {},
  previousState: null,
  login: false,
});

function AuthRequiredReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGIN_STATUS:
      console.log('default action in reducer happened');
      return state;
    case NOT_LOGGED_IN:
      return state.set('login', false);
    case LOGGED_IN:
      return state.set('login', true);
    case LOAD_PRIVILEGES:
      return state.set('privileges', action.data);
    case STORE_USER_INFO:
      return state.set('userInfo', fromJS(action.data));
    case STORE_PREVIOUS_STATE:
      return state.set('previousState', fromJS(action.state));
    default:
      return state;
  }
}

export default AuthRequiredReducer;
