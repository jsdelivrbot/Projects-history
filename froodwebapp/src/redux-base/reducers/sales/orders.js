import { ORDERS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const orders = getMainContainerReducer(ORDERS);

export default orders;
