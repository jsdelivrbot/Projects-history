import request from '../utils/api/request_super';
import patch from '../utils/api/patch';
import { reqHeaders } from '../utils/api/headers';

/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const get = {
  getTasksList: (startDate, endDate) => request(`${url}/users/me/tasks?q=plannedStartTime>"${startDate}",plannedStartTime<"${endDate}"&expand=customer&limitedexpand=employee&sort=plannedStartTime`, reqHeaders),
  getTaskDetail: id => request(`${url}/booking/tasks/${id}?expand=customer&limitedexpand=employee`, reqHeaders),
  startTask: (id, payload) => patch(`${url}/booking/tasks/${id}`, reqHeaders, payload),
  finishTask: (id, payload) => patch(`${url}/booking/tasks/${id}`, reqHeaders, payload),
};

export default get;
