import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PRICE_LIST_GET = createRequestTypes('PRICE_LIST_GET');
export const PRICE_LIST_SAVE = createRequestTypes('PRICE_LIST_SAVE');
export const PRICE_LIST_UPDATE = createRequestTypes('PRICE_LIST_UPDATE');
export const PRICE_LIST_SKU_SAVE = createRequestTypes('PRICE_LIST_SKU_SAVE');
export const PRICE_LIST_SKU_UPDATE = createRequestTypes('PRICE_LIST_SKU_UPDATE');

// ------------------------Action creators---------------
export const priceListGetRequest = createRequestFunc(PRICE_LIST_GET, 'pricelist/{id}');
export const priceListSaveRequest = createRequestFunc(PRICE_LIST_SAVE, 'pricelist');
export const priceListUpdateRequest = createRequestFunc(PRICE_LIST_UPDATE, 'pricelist');
export const priceListSkuSaveRequest = createRequestFunc(PRICE_LIST_SKU_SAVE, 'pricelist/{id}/skus');
export const priceListSkuUpdateRequest = createRequestFunc(PRICE_LIST_SKU_UPDATE, 'pricelist/{id}/skus');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  PRICE_LIST_GET,
  PRICE_LIST_SAVE,
  PRICE_LIST_UPDATE,
  PRICE_LIST_SKU_SAVE,
  PRICE_LIST_SKU_UPDATE
]);
