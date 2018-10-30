import { createRequestTypes } from 'utils';

// ------------------------Action constants---------------
export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = 'LOGOUT';

// ------------------------Action creators---------------
export const loginRequest = (email, password) => ({
  type: LOGIN.REQUEST,
  email,
  password
});

export const loginSuccess = user => ({
  type: LOGIN.SUCCESS,
  user,
});

export const logoutRequest = () => ({
  type: 'LOGOUT'
});
