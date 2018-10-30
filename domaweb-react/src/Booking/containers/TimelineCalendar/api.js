import request from '../../../utils/api/request';
import request_super from '../../../utils/api/request_super';
import patch_super from '../../../utils/api/patch_super';

import patch from '../../../utils/api/patch';
import post from '../../../utils/api/post';
import deleteMethod from '../../../utils/api/delete';

import { reqHeaders } from '../../../utils/api/headers';
import { formatDate } from './utils';
/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const currentDate = `${formatDate(new Date())}${'T00:00:00'}`;

const API = {
  booking: () => request(`${url}/booking/timetabs`, reqHeaders),
  getTimeatab: id => request(`${url}/booking/timetabs/${id}?q=plannedStartTime:"${currentDate}"`, reqHeaders),
  getTimetabDetailStartDate: (id, formattedStartDate) => request(`${url}/booking/timetabs/${id}?q=plannedStartTime:"${formattedStartDate}"`, reqHeaders),
  getTimeatabDateRange: (id, formattedStartDate, formattedEndDate) => request(`${url}/booking/timetabs/${id}?q=plannedStartTime>"${formattedStartDate}",plannedStartTime<"${formattedEndDate}"`, reqHeaders),
  getTimetabDetail: id => request(`${url}/booking/timetabs/${id}/tasks?expand=taskGroup,employee&limitedexpand=customer&sort=plannedStartTime&q=plannedStartTime:"${currentDate}"`, reqHeaders),
  getTimetabDetailRange: (id, formattedStartDate, formattedEndDate) => request(`${url}/booking/timetabs/${id}/tasks?expand=taskGroup,employee&limitedexpand=customer&sort=plannedStartTime&q=plannedStartTime>"${formattedStartDate}",plannedStartTime<"${formattedEndDate}"&limit=2000`, reqHeaders),
  gettask: () => request_super('/booking/tasks/381905', reqHeaders),
  getTaskDetails: id => request(`${url}/booking/tasks/${id}?expand=itemType,customer,employee,taskGroup,repetition`, reqHeaders),
  taskEdit: (id, payload) => patch(`${url}/booking/tasks/${id}`, reqHeaders, payload),
  addTask: payload => post(`${url}/booking/tasks/`, reqHeaders, payload),
  updateSingleTask: (id, payload) => patch(`${url}/booking/tasks/${id}`, reqHeaders, payload),
  updateRepeatedTask: (id, payload) => patch(`${url}/booking/tasks/${id}/repetition`, reqHeaders, payload),
  getTemplateRepetitions: id => request(`${url}/booking/tasktemplates/${id}/repetitions`, reqHeaders),
  getAvailableServices: id => request(`${url}/customers/${id}/availableservices`, reqHeaders),
  // old getAvailableServices -> getAvailableServices: id => request(`${url}/customers/${id}/availableServices`, reqHeaders),
  getTasktypeServices: id => request(`${url}/booking/tasktype/${id}/services`, reqHeaders),
  getSpecialHolidays: () => request(`${url}/booking/specialholidays`, reqHeaders),
  postRepetitionsView: payload => post(`${url}/booking/repetitions/view`, reqHeaders, payload),
  updateService: (taskId, payload) => patch(`${url}/booking/tasks/${taskId}/services/${payload.serviceId}`, reqHeaders, payload),
  deleteService: (taskId, serviceId) => deleteMethod(`${url}/booking/tasks/${taskId}/services/${serviceId}`, reqHeaders),
  addService: (taskId, payload) => post(`${url}/booking/tasks/${taskId}/services`, reqHeaders, payload),
};

export default API;
