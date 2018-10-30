import {
  createRequestTypes,
  createRequestFunc,
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants--------------
export const SKU_SEARCH = createRequestTypes('SKU_SEARCH');
export const SKU_SEARCH_BY_VENDOR = createRequestTypes('SKU_SEARCH_BY_VENDOR');
export const BUNDLE_SEARCH = createRequestTypes('BUNDLE_SEARCH');
export const CUSTOMER_SEARCH = createRequestTypes('CUSTOMER_SEARCH');
export const SUPPLIER_SEARCH = createRequestTypes('SUPPLIER_SEARCH');
export const CUSTOMER_ORDERS_SEARCH = createRequestTypes('CUSTOMER_ORDERS_SEARCH');
export const PROMOTION_SEARCH = createRequestTypes('PROMOTION_SEARCH');

export const SKU_WAREHOUSE_INFO_GET = createRequestTypes('SKU_WAREHOUSE_INFO_GET');
export const SKU_VENDOR_WAREHOUSE_INFO_GET = createRequestTypes('SKU_VENDOR_WAREHOUSE_INFO_GET');

// ------------------------Action creators---------------
export const skuSearchRequest = createRequestFunc(SKU_SEARCH, 'skus/search?keyword={keyword}&from=0&limit=10');
export const skuSearchByVendorRequest = createRequestFunc(SKU_SEARCH_BY_VENDOR, 'skus/search?keyword={keyword}&vendorId={vendorId}&from=0&limit=10');
export const bundleSearchRequest = createRequestFunc(BUNDLE_SEARCH, 'bundles/search?keyword={keyword}&from=0&limit=10');
export const customerSearchRequest = createRequestFunc(CUSTOMER_SEARCH, 'customers/search?keyword={keyword}&from=0&limit=10');
export const supplierSearchRequest = createRequestFunc(SUPPLIER_SEARCH, 'vendors/search?keyword={keyword}&from=0&limit=10');
export const promotionSearchRequest = createRequestFunc(PROMOTION_SEARCH, 'promotions/search?keyword={keyword}&from=0&limit=10');
export const customerOrderSearchRequest = createRequestFunc(CUSTOMER_ORDERS_SEARCH, 'customer/{id}/orders?keyword={keyword}&from=0&limit=10');
export const skuWarehouseInfoRequest = createRequestFunc(SKU_WAREHOUSE_INFO_GET, 'skus?id={id}');
export const skuVendorWarehouseInfoRequest = createRequestFunc(SKU_VENDOR_WAREHOUSE_INFO_GET, 'skus?id={id}&vendorId={vendorId}');

addActionsToSagas([
  SKU_SEARCH,
  SKU_SEARCH_BY_VENDOR,
  BUNDLE_SEARCH,
  CUSTOMER_SEARCH,
  SUPPLIER_SEARCH,
  CUSTOMER_ORDERS_SEARCH,
  PROMOTION_SEARCH,

  SKU_WAREHOUSE_INFO_GET,
  SKU_VENDOR_WAREHOUSE_INFO_GET
]);
