import request from '../utils/api/request';
import { reqHeaders } from '../utils/api/headers';
import formatDate from './utils';

/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const currentDate = formatDate(new Date());

const get = {
  booking: () => request(`${url}/booking/timetabs`, reqHeaders),
  getunit: id => request(`${url}/booking/timetabs/${id}?q=plannedStartTime:"${currentDate}"`, reqHeaders),
  getunitdetail: id => request(`${url}/booking/timetabs/${id}/tasks?expand=taskGroup&limitedexpand=customer&sort=plannedStartTime&q=plannedStartTime:"${currentDate}"`, reqHeaders),

};

export default get;
