import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CUSTOMER_PROFILE_GET = createRequestTypes('CUSTOMER_PROFILE_GET');
export const CUSTOMER_PROFILE_UPDATE = createRequestTypes('CUSTOMER_PROFILE_UPDATE');

export const CUSTOMER_ADDRESSES_GET = createRequestTypes('CUSTOMER_ADDRESSES_GET');
export const CUSTOMER_ADDRESSES_SAVE = createRequestTypes('CUSTOMER_ADDRESSES_SAVE');
export const CUSTOMER_ADDRESSES_UPDATE = createRequestTypes('CUSTOMER_ADDRESSES_UPDATE');
export const CUSTOMER_ADDRESSES_DELETE = createRequestTypes('CUSTOMER_ADDRESSES_DELETE');

export const CUSTOMER_ORDERS_GET = createRequestTypes('CUSTOMER_ORDERS_GET');

export const CUSTOMER_CREDITS_GET = createRequestTypes('CUSTOMER_CREDITS_GET');
export const CUSTOMER_CREDITS_SAVE = createRequestTypes('CUSTOMER_CREDITS_SAVE');


// ------------------------Action creators---------------
export const customerProfileGetRequest = createRequestFunc(CUSTOMER_PROFILE_GET, 'customer/{id}');
export const customerProfileUpdateRequest = createRequestFunc(CUSTOMER_PROFILE_UPDATE, 'customer');

export const customerAddressGetRequest = createRequestFunc(CUSTOMER_ADDRESSES_GET, 'customer/{id}/addresses');
export const customerAddressSaveRequest = createRequestFunc(CUSTOMER_ADDRESSES_SAVE, 'customer/{id}/addresses');
export const customerAddressUpdateRequest = createRequestFunc(CUSTOMER_ADDRESSES_UPDATE, 'customer/{id}/addresses');
export const customerAddressDeleteRequest = createRequestFunc(CUSTOMER_ADDRESSES_DELETE, 'customer/{id}/addresses/{addressId}');

export const customerOrdersGetRequest = createRequestFunc(CUSTOMER_ORDERS_GET, 'customer/{id}/orders');

export const customerCreditsGetRequest = createRequestFunc(CUSTOMER_CREDITS_GET, 'customer/{id}/credits');
export const customerCreditsSaveRequest = createRequestFunc(CUSTOMER_CREDITS_SAVE, 'customer/{id}/credits');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CUSTOMER_PROFILE_GET,
  CUSTOMER_PROFILE_UPDATE,

  CUSTOMER_ADDRESSES_GET,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_DELETE,
  CUSTOMER_ORDERS_GET,
  CUSTOMER_CREDITS_GET,
  CUSTOMER_CREDITS_SAVE

]);
