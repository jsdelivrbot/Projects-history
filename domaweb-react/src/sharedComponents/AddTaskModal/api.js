import request_super from '../../utils/api/request_super';
import post from '../../utils/api/post';
import post_super from '../../utils/api/post_super';

import { reqHeaders } from '../../utils/api/headers';

const url = process.env.CONFIG.apiUrl;

export const getCustomers = () => request_super(`${url}/customers/?booking=true&sort=lastName,firstName&limit=2000`, reqHeaders);
export const getLazyLoadedCustomers = lastId => request_super(`${url}/customers/?booking=true&sort=lastName,firstName&after=${lastId}`, reqHeaders);
export const getTasktypes = () => request_super(`${url}/booking/tasktype`, reqHeaders);
export const getTask = id => request_super(`${url}/booking/tasks/${id}?expand=itemType,customer,employee,taskGroup,repetition`, reqHeaders);
export const getAvailableServices = id => request_super(`${url}/customers/${id}/availableservices`, reqHeaders);
export const addTask = payload => post_super(`${url}/booking/tasks/`, reqHeaders, payload)
