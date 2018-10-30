import {
  createRequestTypes,
  createRequestFunc,
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants--------------
export const SKU_WAREHOUSE_BIN_GET = createRequestTypes('SKU_WAREHOUSE_BIN_GET');
export const SKU_BATCHES_GET_WITH_FILTER = createRequestTypes('SKU_BATCHES_GET_WITH_FILTER');
export const ADJUSTMENT_SAVE = createRequestTypes('ADJUSTMENT_SAVE');

// ------------------------Action creators---------------
export const skuWarehouseBinGetRequest = createRequestFunc(SKU_WAREHOUSE_BIN_GET, 'adjustment/skus/{id}/warehouse/info');
export const skuBatchesGetWithFilterRequest = createRequestFunc(SKU_BATCHES_GET_WITH_FILTER, 'adjustment/skus/{id}/batches');
export const adjustmentSaveRequest = createRequestFunc(ADJUSTMENT_SAVE, 'adjustment');

// -------------------Add actions to Sagas --------------
addActionsToSagas([
  SKU_WAREHOUSE_BIN_GET,
  SKU_BATCHES_GET_WITH_FILTER,
  ADJUSTMENT_SAVE
]);
