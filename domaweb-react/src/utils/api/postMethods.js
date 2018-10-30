import httpPost from './post';
import { postHeaders } from './headers';

/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const post = {
  domawebRegisterPhone: (payload) => httpPost(`${url}/register/step1`, postHeaders, payload),
  domawebRegisterStep2: (payload) => httpPost(`${url}/register/step2`, postHeaders, payload),
  domawebRegisterStep3: (payload) => httpPost(`${url}/register/step3`, postHeaders, payload),
  loginDomauser: (payload) => httpPost(`${url}/login/domauser/srp`, postHeaders, payload),
  loginDomauserStep2: (payload) => httpPost(`${url}/login/domauser/srp2`, postHeaders, payload),
  logout: () => httpPost(`${url}/logout`, postHeaders),
};

export default post;