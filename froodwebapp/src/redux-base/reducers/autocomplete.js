// @flow
import {
  SKU_SEARCH,
  SKU_SEARCH_BY_VENDOR,
  BUNDLE_SEARCH,
  CUSTOMER_SEARCH,
  CUSTOMER_ORDERS_SEARCH,
  SUPPLIER_SEARCH,
  PROMOTION_SEARCH,
  SKU_WAREHOUSE_INFO_GET,
  SKU_VENDOR_WAREHOUSE_INFO_GET
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingAutoComplete: false,
  skus: [],
  bundles: [],
  customers: [],
  customerOrders: [],
  suppliers: [],
  promotions: [],
  gridRowId: null,
  skuWarehouseInfo: {}
};

export default function autocomplete(
  state: Object = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case SKU_SEARCH.REQUEST:
    case SKU_SEARCH_BY_VENDOR.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        skus: []
      };
    case BUNDLE_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        bundles: []
      };
    case CUSTOMER_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        customers: []
      };
    case CUSTOMER_ORDERS_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        customerOrders: []
      };
    case SUPPLIER_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        suppliers: []
      };
    case PROMOTION_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: action.payload.length > 2,
        promotions: []
      };
    case SKU_WAREHOUSE_INFO_GET.REQUEST:
    case SKU_VENDOR_WAREHOUSE_INFO_GET.REQUEST:
      return {
        ...state,
        gridRowId: action.gridRowId,
        skuWarehouseInfo: {}
      };
    case SKU_SEARCH.SUCCESS:
    case SKU_SEARCH_BY_VENDOR.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        skus: action.data,
      };
    case BUNDLE_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        bundles: action.data,
      };
    case CUSTOMER_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        customers: action.data
      };
    case CUSTOMER_ORDERS_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        customerOrders: action.data
      };
    case SUPPLIER_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        suppliers: action.data,
      };
    case PROMOTION_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        promotions: action.data
      };
    case SKU_WAREHOUSE_INFO_GET.SUCCESS:
    case SKU_VENDOR_WAREHOUSE_INFO_GET.SUCCESS: {
      const {
        id,
        skuName,
        vendorSku,
        vendorSkuName,
        availableQuantity,
        uomName,
        taxRate,
        unitPrice
      } = action.data[0];

      return {
        ...state,
        skuWarehouseInfo: {
          id,
          skuName,
          vendorSku,
          vendorSkuName,
          availableQuantity,
          uomName,
          taxRate,
          unitPrice
        }
      };
    }
    default:
      return state;
  }
}
