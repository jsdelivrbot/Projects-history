import request from 'superagent';
import { getCookie } from '../../utils/getCookie';
import interceptor from './interceptor';

const baseUrl = process.env.CONFIG.apiUrl;

const apiCall = (url, query, data) => {
  return request.patch(`${baseUrl}/${url}`)
  .withCredentials()
  .set('Authorization', 'true')
  .set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
  .set('Accept', 'application/json', 'application/xml')
  .query(query)
  .use(interceptor)
  .send(data)
  .then((response) => response.body);
};

export default apiCall;
