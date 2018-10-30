//import post from './post';
//import { postHeaders } from './headers';
import post_super from '../../../utils/api/post_super';
import request_super from '../../../utils/api/request_super';

/**
 * list here urls you use and call them as functions in your code
 */

const post = {
  domawebRegisterPhone: (payload) => post_super(`register/step1`, null, payload),
  domawebRegisterStep2: (payload) => post_super(`register/step2`, null, payload),
  domawebRegisterStep3: (payload) => post_super(`register/step3`, null, payload),
  loginDomauser: (payload) => post_super(`login/domauser/srp`, null, payload),
  loginDomauserStep2: (payload) => post_super(`login/domauser/srp2`, null, payload),
  logout: () => post_super(`logout`),
};

export const get = {
  user: () => request_super(`user`),
};

export default post;