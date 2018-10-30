import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PROD_CAT_GET = createRequestTypes('PROD_CAT_GET');
export const PROD_CAT_SAVE = createRequestTypes('PROD_CAT_SAVE');
export const PROD_CAT_UPDATE = createRequestTypes('PROD_CAT_UPDATE');
export const PROD_CAT_DELETE = createRequestTypes('PROD_CAT_DELETE');

// ------------------------Action creators---------------
export const prodCatGetRequest = createRequestFunc(PROD_CAT_GET, 'categories');
export const prodCatSaveRequest = createRequestFunc(PROD_CAT_SAVE, 'categories');
export const prodCatUpdateRequest = createRequestFunc(PROD_CAT_UPDATE, 'categories');
export const prodCatDeleteRequest = createRequestFunc(PROD_CAT_DELETE, 'categories/{id}');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  PROD_CAT_GET,
  PROD_CAT_SAVE,
  PROD_CAT_UPDATE,
  PROD_CAT_DELETE
]);
