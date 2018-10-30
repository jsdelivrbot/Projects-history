import success from 'redux-base/reducers/success';
import {
  // inventory
  STOCK_COUNT_SAVE,
  STOCK_COUNT_START_UPDATE,
  STOCK_COUNT_FINALIZE_UPDATE,
  STOCK_COUNT_DETAIL_CONFIRM_UPDATE,

  ORDER_UPDATE_PICK_DATA,
  ORDER_UPDATE_ALLOCATION_DATA,
  ORDER_UPDATE_PACK_DATA,
  ORDER_UPDATE_SHIP_DATA,
  ADJUSTMENT_SAVE,
  BUNDLE_INFO_SAVE,
  BUNDLE_INFO_UPDATE,
  BUNDLE_ITEMS_SAVE,
  BUNDLE_ITEMS_UPDATE,
  BUNDLE_ITEMS_DELETE,
  BUNDLE_ASSEMBLIES_UPDATE,
  PURCHASE_SUPPLIER_SAVE,
  PURCHASE_SUPPLIER_UPDATE,
  PURCHASE_SUPPLIER_LOCATIONS_SAVE,
  PURCHASE_SUPPLIER_LOCATIONS_UPDATE,
  PURCHASE_SUPPLIER_NOTES_SAVE,
  PURCHASE_SUPPLIER_CONTACTS_SAVE,
  PURCHASE_SUPPLIER_CONTACTS_UPDATE,
  PURCHASE_SUPPLIER_CONTACTS_DELETE,
  PURCHASE_SUPPLIER_PRICE_LIST_UPDATE,
  RIGHTS_UPDATE,
  USERS_SAVE,
  USERS_UPDATE,
  USERS_DELETE,
  ROLES_SAVE,
  ROLES_UPDATE,
  ROLES_DELETE,
  LOCATIONS_INFO_UPDATE,
  PAY_TERMS_SAVE,
  PAY_TERMS_UPDATE,
  PAY_TERMS_DELETE,
  TAX_CODES_SAVE,
  TAX_CATEGORIES_SAVE,
  TAX_CODES_UPDATE,
  TAX_CATEGORIES_UPDATE,
  TAX_CODES_DELETE,
  TAX_CATEGORIES_DELETE,
  UOM_SAVE,
  UOM_UPDATE,
  UOM_DELETE,
  UOM_CONVERSION_SAVE,
  UOM_CONVERSION_UPDATE,
  UOM_CONVERSION_DELETE,
  PROD_CAT_SAVE,
  PROD_CAT_DELETE,
  PRICE_LIST_SAVE,
  PRICE_LIST_UPDATE,
  PRICE_LIST_SKU_SAVE,
  PRICE_LIST_SKU_UPDATE,
  CUSTOMER_PROFILE_UPDATE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_DELETE,
  TRANSPORTERS_UPDATE,
  SLOTS_SAVE,
  SLOTS_UPDATE,
  SLOTS_STATUS_UPDATE,
  SLOTS_DELETE,
  HOLIDAYS_SAVE,
  HOLIDAYS_DELETE,
  EXTRAS_UPDATE,
  LOCATION_ZONES_SAVE,
  LOCATION_ZONES_UPDATE,
  LOCATION_ZONE_BINS_SAVE,
  LOCATION_ZONE_BINS_UPDATE,
  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_UPDATE
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('success reducer', () => {
  const initialState = {
    successMessage: null
  };

  it('handles ORDER_UPDATE_PICK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_PICK_DATA.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Rights Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_ALLOCATION_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_ALLOCATION_DATA.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Rights Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_PACK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_PACK_DATA.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Rights Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_SHIP_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_SHIP_DATA.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Rights Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles RIGHTS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: RIGHTS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Rights Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles USERS_SAVE_SUCCESS action type', () => {
    const action = {
      type: USERS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'User Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles USERS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: USERS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'User Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles USERS_DELETE_SUCCESS action type', () => {
    const action = {
      type: USERS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'User Deactivated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ROLES_SAVE_SUCCESS action type', () => {
    const action = {
      type: ROLES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Role Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ROLES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ROLES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Role Activated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ROLES_DELETE_SUCCESS action type', () => {
    const action = {
      type: ROLES_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Role Deactivated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_INFO_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATIONS_INFO_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Location Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_SAVE_SUCCESS action type', () => {
    const action = {
      type: PAY_TERMS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Payment Term Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PAY_TERMS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Payment Term Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_DELETE_SUCCESS action type', () => {
    const action = {
      type: PAY_TERMS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Payment Term Deactivated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_SAVE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Code Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Code Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_DELETE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Code Deactivated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_SAVE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Category Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Category Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_DELETE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Tax Category Deactivated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_SAVE.SUCCESS action type', () => {
    const action = {
      type: UOM_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'UOM SAVED';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_UPDATE.SUCCESS action type', () => {
    const action = {
      type: UOM_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'UOM Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_DELETE.SUCCESS action type', () => {
    const action = {
      type: UOM_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'UOM Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_SAVE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Conversion Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_UPDATE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Conversion Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_DELETE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Conversion Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_SAVE_SUCCESSS action type', () => {
    const action = {
      type: PROD_CAT_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Product Categories Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_DELETE_SUCCESSS action type', () => {
    const action = {
      type: PROD_CAT_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Product Category Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SAVE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Price List Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Price List Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_SAVE.SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SKU_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'SKU Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_UPDATE.SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SKU_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'SKU Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles ADJUSTMENT_SAVE.SUCCESS action type', () => {
    const action = {
      type: ADJUSTMENT_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Adjustment Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_SAVE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_UPDATE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_SAVE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Item Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Item Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_DELETE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Item Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ASSEMBLIES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ASSEMBLIES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bundle Batches Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_SAVE_SUCCES action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Address Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_PROFILE_UPDATE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_PROFILE_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Customer Profile Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_UPDATE.SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Address Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_DELETE.SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Address Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_SAVE_SUCCESS action type', () => {
    const action = {
      type: SLOTS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Slot Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_SAVE.SUCCESS action type', () => {
    const action = {
      type: HOLIDAYS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Holiday Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles TRANSPORTERS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TRANSPORTERS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Fulfilment Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_UPDATE.SUCCESS action type', () => {
    const action = {
      type: SLOTS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Slot Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_STATUS_UPDATE.SUCCESS action type', () => {
    const action = {
      type: SLOTS_STATUS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Slot Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles EXTRAS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: EXTRAS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Extras Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_DELETE_SUCCESSS action type', () => {
    const action = {
      type: SLOTS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Slot Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_DELETE.SUCCESS action type', () => {
    const action = {
      type: HOLIDAYS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Holiday Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_SAVE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Stock Count Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_START_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_START_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Stock Count Started';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_FINALIZE_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_FINALIZE_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Stock Count Finalized';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_DETAIL_CONFIRM_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_DETAIL_CONFIRM_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Stock Count Detail Confirmed';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_SAVE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Zone Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONES_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Zone Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_SAVE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bin Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Bin Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Product Supplier Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Supplier Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Location Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Location Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_NOTES_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_NOTES_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Note Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Contact Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Contact Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_DELETE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_DELETE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Contact Deleted';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_PRICE_LIST_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Price List Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_SAVE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Order Saved';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_UPDATE.SUCCESS
    };
    const state = cloneDeep(initialState);
    state.successMessage = 'Order Updated';

    expect(success(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(success(initialState, {})).toEqual(initialState);
  });
});
