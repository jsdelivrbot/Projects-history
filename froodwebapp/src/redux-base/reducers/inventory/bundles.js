import { BUNDLES } from 'redux-base/actions';
import { getMainContainerReducer } from 'utils';
// --------------------------- Reducer function --------------------------

const bundles = getMainContainerReducer(BUNDLES);

export default bundles;
