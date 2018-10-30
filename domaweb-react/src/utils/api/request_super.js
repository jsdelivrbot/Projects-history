import request from 'superagent';
import { getCookie } from '../../utils/getCookie';
import interceptor from './interceptor';

const baseUrl = process.env.CONFIG.apiUrl;

const apiCall = (url, query) => {
  let encodedURL;
  if (url.includes(baseUrl)) {
    encodedURL = encodeURI(`${url}`);
  } else {
    encodedURL = encodeURI(`${baseUrl}/${url}`);
  }

  return request.get(`${encodedURL}`)
  .withCredentials()
  .set('Authorization', 'true')
  .set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
  .set('Accept', 'application/json')
  .query(query)
  .use(interceptor)
  .then(response => response.body);
};

export default apiCall;
