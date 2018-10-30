/* eslint-disable indent */
// common
export * from './commonDataFlow';
export * from './loginFlow';
export * from './errorFlow';
export * from './autocompleteFlow';
// sales
  // orders
  export * from './sales/ordersFlow';
  export * from './sales/orderFlow';
  // promotions
  export * from './sales/promotionsFlow';
  export * from './sales/promotionFlow';
  // customers
  export * from './sales/customersFlow';
  export * from './sales/customerFlow';
  export * from './sales/customerProfileFlow';

// inventory
  // items
  export * from './inventory/itemsFlow';
  export * from './inventory/itemFlow';
  // adjustments
  export * from './inventory/adjustmentFlow';
  export * from './inventory/adjustmentsFlow';

  // stock count
  export * from './inventory/stockCountsFlow';
  export * from './inventory/stockCountFlow';

  // bundles
  export * from './inventory/bundlesFlow';
  export * from './inventory/bundleFlow';


// purchase
  // orders
  export * from './purchase/purchaseOrdersFlow';
  export * from './purchase/purchaseOrderFlow';
  // suppliers
  export * from './purchase/suppliersFlow';
  export * from './purchase/supplierFlow';

// settings
  // sales
  export * from './settings/sales/fulfilmementFlow';
  export * from './settings/sales/channelsFlow';
  export * from './settings/sales/channelFlow';
  // inventory
  export * from './settings/inventory/productCategoriesFlow';
  export * from './settings/system/uomFlow';
  export * from './settings/system/numericFlow';
  // system
  export * from './settings/system/usersFlow';
  export * from './settings/system/locationsFlow';
  export * from './settings/system/paymentTermsFlow';
  export * from './settings/system/taxFlow';
  export * from './settings/system/priceListFlow';
  export * from './settings/system/priceListsFlow';
