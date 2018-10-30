import request from './request_super';
import { reqHeaders } from './headers';

/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const get = {
  user: () => request(`${url}/user`, reqHeaders),
  booking: () => request(`${url}/booking/timetabs`, reqHeaders),
  getunit: id => request(`${url}/booking/timetabs/${id}`, reqHeaders),
};

export default get;
