import request from 'superagent';
import { getCookie } from '../../utils/getCookie';
import interceptor from './interceptor';

const baseUrl = process.env.CONFIG.apiUrl;

const apiCall = (url, query, data) => {
  let encodedURL;
  if (url.includes(baseUrl)) {
    encodedURL = encodeURI(`${url}`);
  } else {
    encodedURL = encodeURI(`${baseUrl}/${url}`);
  }

  return request.post(`${encodedURL}`)
  .withCredentials()
  .set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
  .set('Accept', 'application/json', 'application/xml')
  .query(query)
  .use(interceptor)
  .send(data)
  .then((response) => response.body);
};

export default apiCall;
