import { PURCHASE_ORDERS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const purchaseOrders = getMainContainerReducer(PURCHASE_ORDERS);

export default purchaseOrders;
