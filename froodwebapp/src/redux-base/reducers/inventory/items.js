import { ITEMS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const items = getMainContainerReducer(ITEMS);

export default items;
