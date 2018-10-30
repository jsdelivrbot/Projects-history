
import post from '../../../utils/api/post_super';

export const postMedication = (customerId, payload) => post(`customers/${customerId}/medication/`, null, payload);