import get from '../../../utils/api/request_super';
import post from '../../../utils/api/post_super';

export const medById = (id) => get(`medication/${id}`);
export const getAllCustomerMeds = (id) => get(`customers/${id}/medication/`);
export const customerMedById = (customer, id) => get(`customers/${customer}/medication/${id}`);
export const addCustomerMed = (customer, id, payload) =>
  post(`customers/${customer}/medication/${id}`, null, payload);
