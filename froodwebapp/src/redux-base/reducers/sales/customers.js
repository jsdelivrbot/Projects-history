import { CUSTOMERS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';

// --------------------------- Reducer function --------------------------
const customers = getMainContainerReducer(CUSTOMERS);

export default customers;

