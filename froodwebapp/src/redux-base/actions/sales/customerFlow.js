import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CUSTOMER_SAVE = createRequestTypes('CUSTOMER_SAVE');

// ------------------------Action creators---------------
export const customerSaveRequest = createRequestFunc(CUSTOMER_SAVE, 'customer');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CUSTOMER_SAVE
]);
