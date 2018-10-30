import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL = createRequestTypes('STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL');
export const STOCK_COUNT_GET = createRequestTypes('STOCK_COUNT_GET');
export const STOCK_COUNT_SAVE = createRequestTypes('STOCK_COUNT_SAVE');
export const STOCK_COUNT_START_UPDATE = createRequestTypes('STOCK_COUNT_START_UPDATE');
export const STOCK_COUNT_FINALIZE_UPDATE = createRequestTypes('STOCK_COUNT_FINALIZE_UPDATE');
export const STOCK_COUNT_DETAIL_CONFIRM_UPDATE = createRequestTypes('STOCK_COUNT_DETAIL_CONFIRM_UPDATE');

// ------------------------Action creators---------------
export const scWarehousesUsersGetRequest = createParallelRequestFunc(STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL, ['sc/users', 'sc/warehouses']);
export const stockCountGetRequest = createRequestFunc(STOCK_COUNT_GET, 'sc/{id}');
export const stockCountSaveRequest = createRequestFunc(STOCK_COUNT_SAVE, 'sc');
export const stockCountStartUpdateRequest = createRequestFunc(STOCK_COUNT_START_UPDATE, 'sc/{id}/start');
export const stockCountFinalizeUpdateRequest = createRequestFunc(STOCK_COUNT_FINALIZE_UPDATE, 'sc/{id}/finalize');
export const stockCountDetailConfirmUpdateRequest = createRequestFunc(STOCK_COUNT_DETAIL_CONFIRM_UPDATE, 'sc/{id}/detail/{detailId}/confirm');

// -------------------Add actions to Sagas --------------
addActionsToSagas([
  STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL,
  STOCK_COUNT_GET,
  STOCK_COUNT_SAVE,
  STOCK_COUNT_START_UPDATE,
  STOCK_COUNT_FINALIZE_UPDATE,
  STOCK_COUNT_DETAIL_CONFIRM_UPDATE,
]);
