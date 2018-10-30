import { ADJUSTMENTS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const adjustments = getMainContainerReducer(ADJUSTMENTS);

export default adjustments;
