/*
 *
 * Login actions
 *
 */

import {
  FETCH_USER_STATE,
  SESSION_INFO,
  FORMAT_STATE,
  SET_PHASE,
  SET_STEP,
  SET_MESSAGE,
  INIT_REGISTER,
  REGISTER_SRP_STEP1,
  REGISTER_SRP_STEP2,
  REGISTER_SRP_STEP3,
  INIT_LOGIN,
  LOGIN_SRP_STEP1,
  LOGIN_SRP_STEP2,
  USER_CREDENTIALS,
  LOGOUT,
  REDIRECT,
  LOGIN_ERROR,
  LOGIN_ERROR_DISMISS,
} from './constants';

export function fetchUserState() {
  console.log('fetching state');
  return {
    type: FETCH_USER_STATE
  }
}

export function sessionInfo(payload) {
  return {
    type: SESSION_INFO,
    session: payload,
  };
}

export function formatState() {
  console.log('formatting state');
  return {
    type: FORMAT_STATE,
  }
}

export function setPhase(param) {
  console.log('setting phase');
  return {
    type: SET_PHASE,
    phase: param,
  }
}

export function setStep(param) {
  console.log('setting step');
  return {
    type: SET_STEP,
    step: param,
  }
}

export function initRegister(param) {
  console.log('register initiated');
  return {
    type: INIT_REGISTER,
    credentials: param,
  }
}

export function registerSrpStep1(param) {
  console.log('register SRP1 triggered');
  return {
    type: REGISTER_SRP_STEP1,
    data: param,
  }
}

export function registerSrpStep2(param) {
  console.log('register SRP2 triggered');
  return {
    type: REGISTER_SRP_STEP2,
    data: param,
  }
}

export function registerSrpStep3(param) {
  console.log('register SRP3 triggered');
  return {
    type: REGISTER_SRP_STEP3,
    data: param,
  }
}

export function initLogin(param) {
  console.log('login initiated');
  console.log(param);
  return {
    type: INIT_LOGIN,
    credentials: param,
  }
}

export function loginSrpStep1(param) {
  console.log('login SRP1 triggered');
  return {
    type: LOGIN_SRP_STEP1,
    data: param,
  }
}

export function loginSrpStep2(param) {
  console.log('login SRP2 triggered');
  return {
    type: LOGIN_SRP_STEP2,
    data: param,
  }
}

export function userCredentials(param) {
  console.log('user credentials');
  return {
    type: USER_CREDENTIALS,
    credentials: param,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function redirect() {
  return {
    type: REDIRECT,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    data: error.response.body.messages[0].message,
    code: error.response.body.messages[0].errorCode,
  };
}

export function loginErrorDismiss() {
  return {
    type: LOGIN_ERROR_DISMISS,
  }
}