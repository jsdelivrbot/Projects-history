// --------------------------- Reducer function --------------------------
import {
  // sales
  ORDER_SAVE,
  ORDER_UPDATE,
  PROMOTION_SAVE,
  PROMOTION_UPDATE,
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
  CHANNEL_UPDATE,
  LOCATION_ZONES_SAVE,
  LOCATION_ZONES_UPDATE,
  LOCATION_ZONE_BINS_SAVE,
  LOCATION_ZONE_BINS_UPDATE,
  ITEM_INFO_SAVE,
  ITEM_INFO_UPDATE,
  ITEM_SUPPLIERS_SAVE,
  ITEM_IMAGES_SAVE,
  ITEM_IMAGES_DELETE,

  // purchase orders
  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_UPDATE,
  PURCHASE_ORDER_GRN_SAVE,
  PURCHASE_ORDER_GRN_UPDATE,
  PURCHASE_ORDER_INVOICE_UPDATE
} from 'redux-base/actions';

const initialState = {
  successMessage: null
};

export default function success(state = initialState, action = {}) {
  switch (action.type) {
    case ORDER_SAVE.SUCCESS:
      return {
        successMessage: 'Order Saved',
      };
    case ORDER_UPDATE.SUCCESS:
      return {
        successMessage: 'Order Updated',
      };
    case PROMOTION_SAVE.SUCCESS:
      return {
        successMessage: 'Promotion Saved',
      };
    case PROMOTION_UPDATE.SUCCESS:
      return {
        successMessage: 'Promotion Updated',
      };
    case ORDER_UPDATE_PICK_DATA.SUCCESS:
    case ORDER_UPDATE_ALLOCATION_DATA.SUCCESS:
    case ORDER_UPDATE_PACK_DATA.SUCCESS:
    case ORDER_UPDATE_SHIP_DATA.SUCCESS:
    case RIGHTS_UPDATE.SUCCESS:
      return {
        successMessage: 'Rights Updated',
      };
    case USERS_SAVE.SUCCESS:
      return {
        successMessage: 'User Saved',
      };
    case USERS_UPDATE.SUCCESS:
      return {
        successMessage: 'User Updated',
      };
    case USERS_DELETE.SUCCESS:
      return {
        successMessage: 'User Deactivated',
      };
    case ROLES_SAVE.SUCCESS:
      return {
        successMessage: 'Role Saved',
      };
    case ROLES_UPDATE.SUCCESS:
      return {
        successMessage: 'Role Activated',
      };
    case ROLES_DELETE.SUCCESS:
      return {
        successMessage: 'Role Deactivated',
      };
    case LOCATIONS_INFO_UPDATE.SUCCESS:
      return {
        successMessage: 'Location Updated',
      };
    case PAY_TERMS_SAVE.SUCCESS:
      return {
        successMessage: 'Payment Term Saved',
      };
    case PAY_TERMS_UPDATE.SUCCESS:
      return {
        successMessage: 'Payment Term Updated',
      };
    case PAY_TERMS_DELETE.SUCCESS:
      return {
        successMessage: 'Payment Term Deactivated',
      };
    case TAX_CODES_SAVE.SUCCESS:
      return {
        successMessage: 'Tax Code Saved',
      };
    case TAX_CODES_UPDATE.SUCCESS:
      return {
        successMessage: 'Tax Code Updated',
      };
    case TAX_CODES_DELETE.SUCCESS:
      return {
        successMessage: 'Tax Code Deactivated',
      };
    case TAX_CATEGORIES_SAVE.SUCCESS:
      return {
        successMessage: 'Tax Category Saved',
      };
    case TAX_CATEGORIES_UPDATE.SUCCESS:
      return {
        successMessage: 'Tax Category Updated',
      };
    case TAX_CATEGORIES_DELETE.SUCCESS:
      return {
        successMessage: 'Tax Category Deactivated',
      };
    case UOM_SAVE.SUCCESS:
      return {
        successMessage: 'UOM SAVED',
      };
    case UOM_UPDATE.SUCCESS:
      return {
        successMessage: 'UOM Updated',
      };
    case UOM_DELETE.SUCCESS:
      return {
        successMessage: 'UOM Deleted',
      };
    case UOM_CONVERSION_SAVE.SUCCESS:
      return {
        successMessage: 'Conversion Saved',
      };
    case UOM_CONVERSION_UPDATE.SUCCESS:
      return {
        successMessage: 'Conversion Updated',
      };
    case UOM_CONVERSION_DELETE.SUCCESS:
      return {
        successMessage: 'Conversion Deleted',
      };
    case PROD_CAT_SAVE.SUCCESS:
      return {
        successMessage: 'Product Categories Saved',
      };
    case PROD_CAT_DELETE.SUCCESS:
      return {
        successMessage: 'Product Category Deleted',
      };
    case PRICE_LIST_SAVE.SUCCESS:
      return {
        successMessage: 'Price List Saved',
      };
    case PRICE_LIST_UPDATE.SUCCESS:
      return {
        successMessage: 'Price List Updated',
      };
    case PRICE_LIST_SKU_SAVE.SUCCESS:
      return {
        successMessage: 'SKU Saved',
      };
    case PRICE_LIST_SKU_UPDATE.SUCCESS:
      return {
        successMessage: 'SKU Updated',
      };
    case ADJUSTMENT_SAVE.SUCCESS:
      return {
        successMessage: 'Adjustment Saved',
      };
    case BUNDLE_INFO_SAVE.SUCCESS:
      return {
        successMessage: 'Bundle Saved',
      };
    case BUNDLE_INFO_UPDATE.SUCCESS:
      return {
        successMessage: 'Bundle Updated',
      };
    case BUNDLE_ITEMS_SAVE.SUCCESS:
      return {
        successMessage: 'Bundle Item Saved',
      };
    case BUNDLE_ITEMS_UPDATE.SUCCESS:
      return {
        successMessage: 'Bundle Item Updated',
      };
    case BUNDLE_ITEMS_DELETE.SUCCESS:
      return {
        successMessage: 'Bundle Item Deleted',
      };
    case BUNDLE_ASSEMBLIES_UPDATE.SUCCESS:
      return {
        successMessage: 'Bundle Batches Updated',
      };
    case CUSTOMER_ADDRESSES_SAVE.SUCCESS:
      return {
        successMessage: 'Address Saved'
      };
    case CUSTOMER_PROFILE_UPDATE.SUCCESS:
      return {
        successMessage: 'Customer Profile Updated'
      };
    case CUSTOMER_ADDRESSES_UPDATE.SUCCESS:
      return {
        successMessage: 'Address Updated'
      };
    case CUSTOMER_ADDRESSES_DELETE.SUCCESS:
      return {
        successMessage: 'Address Deleted'
      };
    case SLOTS_SAVE.SUCCESS:
      return {
        successMessage: 'Slot Saved'
      };
    case HOLIDAYS_SAVE.SUCCESS:
      return {
        successMessage: 'Holiday Saved'
      };
    case TRANSPORTERS_UPDATE.SUCCESS:
      return {
        successMessage: 'Fulfilment Updated'
      };
    case SLOTS_UPDATE.SUCCESS:
    case SLOTS_STATUS_UPDATE.SUCCESS:
      return {
        successMessage: 'Slot Updated'
      };
    case EXTRAS_UPDATE.SUCCESS:
      return {
        successMessage: 'Extras Updated'
      };
    case SLOTS_DELETE.SUCCESS:
      return {
        successMessage: 'Slot Deleted'
      };
    case HOLIDAYS_DELETE.SUCCESS:
      return {
        successMessage: 'Holiday Deleted'
      };
    case STOCK_COUNT_SAVE.SUCCESS:
      return {
        successMessage: 'Stock Count Saved',
      };
    case STOCK_COUNT_START_UPDATE.SUCCESS:
      return {
        successMessage: 'Stock Count Started',
      };
    case STOCK_COUNT_FINALIZE_UPDATE.SUCCESS:
      return {
        successMessage: 'Stock Count Finalized',
      };
    case STOCK_COUNT_DETAIL_CONFIRM_UPDATE.SUCCESS:
      return {
        successMessage: 'Stock Count Detail Confirmed',
      };
    // case ITEM_MAIN_UPDATE.SUCCESS:
    //   return {
    //     successMessage: 'Item Updated',
    //   };
    // case ITEM_SKU_BINS_SAVE.SUCCESS:
    //   return {
    //     successMessage: 'Link Saved',
    //   };
    // case ITEM_SKU_BINS_UPDATE.SUCCESS:
    //   return {
    //     successMessage: 'Link Updated',
    //   };
    // case ITEM_SKU_BINS_DELETE.SUCCESS:
    //   return {
    //     successMessage: 'Link Deleted',
    //   };
    // case ITEM_SKU_UOM_SAVE.SUCCESS:
    //   return {
    //     successMessage: 'UOM Saved',
    //   };
    // case ITEM_SKU_UOM_UPDATE.SUCCESS:
    //   return {
    //     successMessage: 'UOM Updated',
    //   };
    // case ITEM_SKU_UOM_DELETE.SUCCESS:
    //   return {
    //     successMessage: 'UOM Deleted',
    //   };
    case CHANNEL_UPDATE.SUCCESS:
      return {
        successMessage: 'Channel Updated',
      };
    case LOCATION_ZONES_SAVE.SUCCESS:
      return {
        successMessage: 'Zone Saved',
      };
    case LOCATION_ZONES_UPDATE.SUCCESS:
      return {
        successMessage: 'Zone Updated',
      };
    case LOCATION_ZONE_BINS_SAVE.SUCCESS:
      return {
        successMessage: 'Bin Saved',
      };
    case LOCATION_ZONE_BINS_UPDATE.SUCCESS:
      return {
        successMessage: 'Bin Updated',
      };
    case PURCHASE_SUPPLIER_SAVE.SUCCESS:
      return {
        successMessage: 'Product Supplier Saved',
      };
    case PURCHASE_SUPPLIER_UPDATE.SUCCESS:
      return {
        successMessage: 'Supplier Updated',
      };
    case PURCHASE_SUPPLIER_LOCATIONS_SAVE.SUCCESS:
      return {
        successMessage: 'Location Saved',
      };
    case PURCHASE_SUPPLIER_LOCATIONS_UPDATE.SUCCESS:
      return {
        successMessage: 'Location Updated',
      };
    case PURCHASE_SUPPLIER_NOTES_SAVE.SUCCESS:
      return {
        successMessage: 'Note Saved',
      };
    case PURCHASE_SUPPLIER_CONTACTS_SAVE.SUCCESS:
      return {
        successMessage: 'Contact Saved',
      };
    case PURCHASE_SUPPLIER_CONTACTS_UPDATE.SUCCESS:
      return {
        successMessage: 'Contact Updated',
      };
    case PURCHASE_SUPPLIER_CONTACTS_DELETE.SUCCESS:
      return {
        successMessage: 'Contact Deleted',
      };
    case PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.SUCCESS:
      return {
        successMessage: 'Price List Updated',
      };
    case ITEM_INFO_SAVE.SUCCESS:
      return {
        successMessage: `${action.data.id} has been saved`,
      };
    case ITEM_INFO_UPDATE.SUCCESS:
      return {
        successMessage: `${action.data.id} has been updated`,
      };
    case PURCHASE_ORDER_SAVE.SUCCESS:
      return {
        successMessage: `Order Saved with status ${action.data.status}`
      };
    case PURCHASE_ORDER_UPDATE.SUCCESS:
      return {
        successMessage: `Order Updated to status ${action.data.status}`
      };
    case PURCHASE_ORDER_GRN_SAVE.SUCCESS:
      return {
        successMessage: 'Goods Received Note Created'
      };
    case PURCHASE_ORDER_GRN_UPDATE.SUCCESS:
      return {
        successMessage: 'Goods Received Note Updated'
      };
    case PURCHASE_ORDER_INVOICE_UPDATE.SUCCESS:
      return {
        successMessage: 'Invoice created'
      };
    case ITEM_SUPPLIERS_SAVE.SUCCESS:
      return {
        successMessage: 'Supplier Link Saved'
      };
    case ITEM_IMAGES_SAVE.SUCCESS:
      return {
        successMessage: 'Image Uploaded'
      };
    case ITEM_IMAGES_DELETE.SUCCESS:
      return {
        successMessage: 'Image Deleted'
      };
    default:
      return {
        ...state,
        successMessage: null,
      };
  }
}
