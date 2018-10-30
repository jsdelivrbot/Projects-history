import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PURCHASE_ORDER_GET_PARALLEL = createRequestTypes('PURCHASE_ORDER_GET_PARALLEL');
export const PURCHASE_ORDER_FIELDS_GET_PARALLEL = createRequestTypes('PURCHASE_ORDER_FIELDS_GET_PARALLEL');
export const PURCHASE_ORDER_GET_GRN = createRequestTypes('PURCHASE_ORDER_GET_GRN');
export const PURCHASE_ORDER_GET_INVOICE = createRequestTypes('PURCHASE_ORDER_GET_INVOICE');

export const PURCHASE_ORDER_SAVE = createRequestTypes('PURCHASE_ORDER_SAVE');
export const PURCHASE_ORDER_GRN_SAVE = createRequestTypes('PURCHASE_ORDER_GRN_SAVE');

export const PURCHASE_ORDER_UPDATE = createRequestTypes('PURCHASE_ORDER_UPDATE');
export const PURCHASE_ORDER_GRN_UPDATE = createRequestTypes('PURCHASE_ORDER_GRN_UPDATE');
export const PURCHASE_ORDER_INVOICE_UPDATE = createRequestTypes('PURCHASE_ORDER_INVOICE_UPDATE');

// ------------------------Action creators---------------
export const purchaseOrderGetRequest = createParallelRequestFunc(PURCHASE_ORDER_GET_PARALLEL, ['purchase/{id}', 'purchase/company/locations', 'purchase/contact/users']);
export const purchaseOrderFieldsGetRequest = createParallelRequestFunc(PURCHASE_ORDER_FIELDS_GET_PARALLEL, ['purchase/company/locations', 'purchase/contact/users']);
export const purchaseOrderGRNGetRequest = createRequestFunc(PURCHASE_ORDER_GET_GRN, 'purchase/{id}/grn');
export const purchaseOrderInvoiceGetRequest = createRequestFunc(PURCHASE_ORDER_GET_INVOICE, 'purchase/{id}/invoices');

export const purchaseOrderSaveRequest = createRequestFunc(PURCHASE_ORDER_SAVE, 'purchase');
export const purchaseOrderGRNSaveRequest = createRequestFunc(PURCHASE_ORDER_GRN_SAVE, 'purchase/{id}/grn');

export const purchaseOrderUpdateRequest = createRequestFunc(PURCHASE_ORDER_UPDATE, 'purchase');
export const purchaseOrderGRNUpdateRequest = createRequestFunc(PURCHASE_ORDER_GRN_UPDATE, 'purchase/{id}/grn');
export const purchaseOrderInvoiceUpdateRequest = createRequestFunc(PURCHASE_ORDER_INVOICE_UPDATE, 'purchase/{id}/invoices');


addActionsToSagas([
  PURCHASE_ORDER_GET_PARALLEL,
  PURCHASE_ORDER_FIELDS_GET_PARALLEL,
  PURCHASE_ORDER_GET_GRN,
  PURCHASE_ORDER_GET_INVOICE,

  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_GRN_SAVE,

  PURCHASE_ORDER_UPDATE,
  PURCHASE_ORDER_GRN_UPDATE,
  PURCHASE_ORDER_INVOICE_UPDATE
]);
