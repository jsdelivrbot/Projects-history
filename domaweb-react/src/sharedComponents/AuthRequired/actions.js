/*
 *
 * AuthRequired actions
 *
 */

import {
  CHECK_LOGIN_STATUS,
  NOT_LOGGED_IN,
  LOGGED_IN,
  LOAD_PRIVILEGES,
  STORE_USER_INFO,
  STORE_PREVIOUS_STATE,
} from './constants';
import { STATUS_CODES } from 'http';

export function checkLoginStatus() {
  console.log('defaultaction happened');
  return {
    type: CHECK_LOGIN_STATUS,
  };
}

export function loginStatus(status) {
  if (status.loggedIn === false) {
    return {
      type: NOT_LOGGED_IN
    }
  }
  if (status.loggedIn === true) {
    return {
      type: LOGGED_IN
    }
  }
}

export function loadPrivileges(privileges) {
  return {
    type: LOAD_PRIVILEGES,
    data: privileges,
  }
}

export function storeUserInfo(info) {
  return {
    type: STORE_USER_INFO,
    data: info,
  };
}

export function storePreviousState(data) {
  return {
    type: STORE_PREVIOUS_STATE,
    state: data,
  };
}
