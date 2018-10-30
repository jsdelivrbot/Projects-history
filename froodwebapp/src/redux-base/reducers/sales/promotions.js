import { PROMOTIONS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';

// --------------------------- Reducer function --------------------------
const promotions = getMainContainerReducer(PROMOTIONS);

export default promotions;

