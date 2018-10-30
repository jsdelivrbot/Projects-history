import { STOCK_COUNTS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const stockCounts = getMainContainerReducer(STOCK_COUNTS);

export default stockCounts;
