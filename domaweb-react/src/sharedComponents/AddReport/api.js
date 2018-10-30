import request from '../../utils/api/request';
import post from '../../utils/api/post';
import { reqHeaders } from '../../utils/api/headers';

/**
 * list here urls you use and call them as functions in your code
 */

const url = process.env.CONFIG.apiUrl;

const get = {
  getSymbols: () => request(`${url}/symbolhierarchy/alternative`, reqHeaders),
  postReport: (customerId, payload) => post(`${url}/customers/${customerId}/reports/`, reqHeaders, payload),
};

export default get;
