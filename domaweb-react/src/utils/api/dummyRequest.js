import request from 'superagent';
import interceptor from './interceptor';
import { getCookie } from '../../utils/getCookie';

const baseUrl = process.env.CONFIG.apiUrl;

const apiCall = (url, query) => {
  return request
    .get(`${baseUrl}/${url}`)
    .set('X-API-KEY', 'tae5ieha3yeif5quei5Pishaifahsh6ing8nu7ish2aeChahfie1hoJi4ooV6kof')
    .set('Accept', 'application/json')
    .query(query)
    .use(interceptor)
    .then((response) => response.body)
};

export default apiCall;
