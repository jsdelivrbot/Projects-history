import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ORDER_GET = createRequestTypes('ORDER_GET');
export const ORDER_SAVE = createRequestTypes('ORDER_SAVE');
export const ORDER_UPDATE = createRequestTypes('ORDER_UPDATE');

export const ORDER_GET_PICK_DATA = createRequestTypes('ORDER_GET_PICK_DATA');
export const ORDER_UPDATE_PICK_DATA = createRequestTypes('ORDER_UPDATE_PICK_DATA');

export const ORDER_GET_ALLOCATION_DATA = createRequestTypes('ORDER_GET_ALLOCATION_DATA');
export const ORDER_UPDATE_ALLOCATION_DATA = createRequestTypes('ORDER_UPDATE_ALLOCATION_DATA');

export const ORDER_GET_PACK_DATA = createRequestTypes('ORDER_GET_PACK_DATA');
export const ORDER_UPDATE_PACK_DATA = createRequestTypes('ORDER_UPDATE_PACK_DATA');

export const ORDER_GET_SHIP_DATA = createRequestTypes('ORDER_GET_SHIP_DATA');
export const ORDER_UPDATE_SHIP_DATA = createRequestTypes('ORDER_UPDATE_SHIP_DATA');

export const ORDER_GET_INVOICE_DATA = createRequestTypes('ORDER_GET_INVOICE_DATA');

// ------------------------Action creators---------------
export const orderGetRequest = createRequestFunc(ORDER_GET, 'order/{id}');
export const orderSaveRequest = createRequestFunc(ORDER_SAVE, 'order');
export const orderUpdateRequest = createRequestFunc(ORDER_UPDATE, 'order');

export const orderGetPickDataRequest = createRequestFunc(ORDER_GET_PICK_DATA, 'order/{id}/pick');
export const orderUpdatePickDataRequest = createRequestFunc(ORDER_UPDATE_PICK_DATA, 'order/{id}/pick');

export const orderGetPackDataRequest = createRequestFunc(ORDER_GET_PACK_DATA, 'order/{id}/pack');
export const orderUpdatePackDataRequest = createRequestFunc(ORDER_UPDATE_PACK_DATA, 'order/{id}/pack');

export const orderGetShipDataRequest = createRequestFunc(ORDER_GET_SHIP_DATA, 'order/{id}/ship');
export const orderUpdateShipDataRequest = createRequestFunc(ORDER_UPDATE_SHIP_DATA, 'order/{id}/ship');

export const orderGetInvoiceDataRequest = createRequestFunc(ORDER_GET_INVOICE_DATA, 'order/{id}/invoice');

export const orderGetAllocationDataRequest = createRequestFunc(ORDER_GET_ALLOCATION_DATA, 'order/{id}/allocation');
export const orderUpdateAllocationDataRequest = createRequestFunc(ORDER_UPDATE_ALLOCATION_DATA, 'order/{id}/allocation');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  ORDER_GET,
  ORDER_SAVE,
  ORDER_UPDATE,

  ORDER_GET_PICK_DATA,
  ORDER_UPDATE_PICK_DATA,

  ORDER_GET_ALLOCATION_DATA,
  ORDER_UPDATE_ALLOCATION_DATA,

  ORDER_GET_PACK_DATA,
  ORDER_UPDATE_PACK_DATA,

  ORDER_GET_SHIP_DATA,
  ORDER_UPDATE_SHIP_DATA,

  ORDER_GET_INVOICE_DATA
]);
