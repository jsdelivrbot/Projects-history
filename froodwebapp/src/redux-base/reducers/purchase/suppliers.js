import { SUPPLIERS } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const suppliers = getMainContainerReducer(SUPPLIERS);

export default suppliers;
