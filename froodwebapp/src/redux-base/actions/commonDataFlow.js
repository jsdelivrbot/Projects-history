// @flow
import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const GET_COMMON_DATA = createRequestTypes('GET_COMMON_DATA');
export const STATE_CITIES_GET = createRequestTypes('STATE_CITIES_GET');
export const DELIVERY_INFO_GET_PARALLEL = createRequestTypes('DELIVERY_INFO_GET_PARALLEL');

// ------------------------Action creators---------------
export const citySearchRequest = createRequestFunc(STATE_CITIES_GET, 'states/{id}/cities');
export const deliveryInfoParallelRequest = createParallelRequestFunc(DELIVERY_INFO_GET_PARALLEL, ['transporters/{id}/extras', 'transporters/{id}/slots']);

export const commonDataRequest = () => ({
  type: GET_COMMON_DATA.REQUEST
});

export const commonDataSuccess = (data: Object) => ({
  type: GET_COMMON_DATA.SUCCESS,
  data
});

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  STATE_CITIES_GET,
  DELIVERY_INFO_GET_PARALLEL
]);
