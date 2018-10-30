import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PURCHASE_SUPPLIER_INFO_GET = createRequestTypes('PURCHASE_SUPPLIER_INFO_GET');
export const PURCHASE_SUPPLIER_SAVE = createRequestTypes('PURCHASE_SUPPLIER_SAVE');
export const PURCHASE_SUPPLIER_UPDATE = createRequestTypes('PURCHASE_SUPPLIER_UPDATE');

export const PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL = createRequestTypes('PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL');
export const PURCHASE_SUPPLIER_LOCATIONS_SAVE = createRequestTypes('PURCHASE_SUPPLIER_LOCATIONS_SAVE');
export const PURCHASE_SUPPLIER_LOCATIONS_UPDATE = createRequestTypes('PURCHASE_SUPPLIER_LOCATIONS_UPDATE');
export const PURCHASE_SUPPLIER_LOCATIONS_DELETE = createRequestTypes('PURCHASE_SUPPLIER_LOCATIONS_DELETE');

export const PURCHASE_SUPPLIER_CONTACTS_GET = createRequestTypes('PURCHASE_SUPPLIER_CONTACTS_GET');
export const PURCHASE_SUPPLIER_CONTACTS_SAVE = createRequestTypes('PURCHASE_SUPPLIER_CONTACTS_SAVE');
export const PURCHASE_SUPPLIER_CONTACTS_UPDATE = createRequestTypes('PURCHASE_SUPPLIER_CONTACTS_UPDATE');
export const PURCHASE_SUPPLIER_CONTACTS_DELETE = createRequestTypes('PURCHASE_SUPPLIER_CONTACTS_DELETE');

export const PURCHASE_SUPPLIER_GET = createRequestTypes('PURCHASE_SUPPLIER_GET');
export const PURCHASE_SUPPLIER_ORDERS_GET = createRequestTypes('PURCHASE_SUPPLIER_ORDERS_GET');

export const PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL = createRequestTypes('PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL');
export const PURCHASE_SUPPLIER_PRICE_LIST_UPDATE = createRequestTypes('PURCHASE_SUPPLIER_PRICE_LIST_UPDATE');

export const PURCHASE_SUPPLIER_NOTES_GET = createRequestTypes('PURCHASE_SUPPLIER_NOTES_GET');
export const PURCHASE_SUPPLIER_NOTES_SAVE = createRequestTypes('PURCHASE_SUPPLIER_NOTES_SAVE');

// ------------------------Action creators---------------
export const supplierInfoGetRequest = createRequestFunc(PURCHASE_SUPPLIER_INFO_GET, 'vendor/{id}');
export const supplierSaveRequest = createRequestFunc(PURCHASE_SUPPLIER_SAVE, 'vendor');
export const supplierUpdateRequest = createRequestFunc(PURCHASE_SUPPLIER_UPDATE, 'vendor');

export const supplierLocationsGetParallelRequest = createParallelRequestFunc(PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL, ['vendor/{id}/locations', 'countries/{countryId}/states']);
export const supplierLocationsSaveRequest = createRequestFunc(PURCHASE_SUPPLIER_LOCATIONS_SAVE, 'vendor/{id}/locations');
export const supplierLocationsUpdateRequest = createRequestFunc(PURCHASE_SUPPLIER_LOCATIONS_UPDATE, 'vendor/{id}/locations');
export const supplierLocationsDeleteRequest = createRequestFunc(PURCHASE_SUPPLIER_LOCATIONS_DELETE, 'vendor/{id}/locations/{locationId}');

export const supplierContactsGetRequest = createRequestFunc(PURCHASE_SUPPLIER_CONTACTS_GET, 'vendor/{id}/contacts');
export const supplierContactsSaveRequest = createRequestFunc(PURCHASE_SUPPLIER_CONTACTS_SAVE, 'vendor/{id}/contacts');
export const supplierContactsUpdateRequest = createRequestFunc(PURCHASE_SUPPLIER_CONTACTS_UPDATE, 'vendor/{id}/contacts');
export const supplierContactsDeleteRequest = createRequestFunc(PURCHASE_SUPPLIER_CONTACTS_DELETE, 'vendor/{id}/contacts/{contactId}');

export const supplierPurchaseGetRequest = createRequestFunc(PURCHASE_SUPPLIER_GET, 'purchase/vendors/{id}');
export const supplierOrdersGetRequest = createRequestFunc(PURCHASE_SUPPLIER_ORDERS_GET, 'vendor/{id}/orders');

export const supplierPriceListGetParallelRequest = createParallelRequestFunc(PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL, ['vendor/{id}/pricelist', 'pricelists']);
export const supplierPriceListUpdateRequest = createRequestFunc(PURCHASE_SUPPLIER_PRICE_LIST_UPDATE, 'vendor/{id}/pricelist');

export const supplierNotesGetRequest = createRequestFunc(PURCHASE_SUPPLIER_NOTES_GET, 'vendor/{id}/notes');
export const supplierNotesSaveRequest = createRequestFunc(PURCHASE_SUPPLIER_NOTES_SAVE, 'vendor/{id}/notes');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  PURCHASE_SUPPLIER_INFO_GET,
  PURCHASE_SUPPLIER_SAVE,
  PURCHASE_SUPPLIER_UPDATE,

  PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL,
  PURCHASE_SUPPLIER_LOCATIONS_SAVE,
  PURCHASE_SUPPLIER_LOCATIONS_UPDATE,
  PURCHASE_SUPPLIER_LOCATIONS_DELETE,

  PURCHASE_SUPPLIER_CONTACTS_GET,
  PURCHASE_SUPPLIER_CONTACTS_SAVE,
  PURCHASE_SUPPLIER_CONTACTS_UPDATE,
  PURCHASE_SUPPLIER_CONTACTS_DELETE,

  PURCHASE_SUPPLIER_GET,
  PURCHASE_SUPPLIER_ORDERS_GET,

  PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL,
  PURCHASE_SUPPLIER_PRICE_LIST_UPDATE,

  PURCHASE_SUPPLIER_NOTES_GET,
  PURCHASE_SUPPLIER_NOTES_SAVE,
]);
