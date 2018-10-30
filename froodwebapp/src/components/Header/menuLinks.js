export default {
  dashboard: [
    {
      url: '/dashboard/sales',
      text: 'Sales'
    }, {
      url: '/dashboard/inventory',
      text: 'Inventory'
    }, {
      url: '/dashboard/purchase',
      text: 'Purchase'
    }
  ],
  sales: [
    {
      url: '/sales/orders',
      text: 'Orders',
      plusIconVisible: true,
      plusIconUrl: '/sales/orders/new',
    },
    // {
    //   url: '/sales/fulfilment',
    //   text: 'Fulfilment',
    //   nestedMenu: true,
    //   nestedItems: [{
    //     url: '/sales/fulfilment/pick-list',
    //     text: 'Pick List',
    //     plusIconVisible: true,
    //     plusIconUrl: '/sales/fulfilment/pick-list/new',
    //   }, {
    //     url: '/sales/fulfilment/package',
    //     text: 'Package',
    //     plusIconVisible: true,
    //     plusIconUrl: '/sales/fulfilment/package/new',
    //   }]
    // },
    {
      url: '/sales/promotions',
      text: 'Promotions',
      plusIconVisible: true,
      plusIconUrl: '/sales/promotions/new',
    }, {
      url: '/sales/customers',
      text: 'Customers',
      plusIconVisible: true,
      plusIconUrl: '/sales/customers/new'
    }
  ],
  inventory: [
    {
      url: '/inventory/all-items',
      text: 'All Items',
      plusIconVisible: true,
      plusIconUrl: '/inventory/all-items/new'
    }, {
      url: '/inventory/item-bundles',
      text: 'Item Bundles',
      plusIconVisible: true,
      plusIconUrl: '/inventory/item-bundles/new'
    }, {
      url: '/inventory/transactions',
      text: 'Transactions',
      nestedMenu: true,
      nestedItems: [{
        url: '/inventory/adjustments',
        text: 'Adjustments',
        plusIconVisible: true,
        plusIconUrl: '/inventory/adjustments/new',
      },
      // {
      //   url: '/inventory/transfers',
      //   text: 'Transfers',
      //   plusIconVisible: true,
      //   plusIconUrl: '/inventory/transfers/new',
      // },
      {
        url: '/inventory/stock-count',
        text: 'Stock Count',
        plusIconVisible: true,
        plusIconUrl: '/inventory/stock-count/new',
      }]
    }
    // , {
    //   url: '/inventory/reports',
    //   text: 'Reports'
    // }
  ],
  purchase: [
    {
      url: '/purchase/orders',
      text: 'Orders',
      plusIconVisible: true,
      plusIconUrl: '/purchase/orders/new',
    }, {
      url: '/purchase/suppliers',
      text: 'Suppliers',
      plusIconVisible: true,
      plusIconUrl: '/purchase/suppliers/new',
    }
    // , {
    //   url: '/purchase/grn',
    //   text: 'GRN',
    //   plusIconVisible: true,
    //   plusIconUrl: '/purchase/grn/new',
    // }
  ],
  settings: [
    {
      url: '/settings/sales',
      text: 'Sales',
      nestedMenu: true,
      nestedItems: [{
        url: '/settings/sales/channels',
        text: 'Channels'
      }, {
        url: '/settings/sales/fulfilment',
        text: 'Fulfilment'
      }]
    }, {
      url: '/settings/inventory',
      text: 'Inventory',
      nestedMenu: true,
      nestedItems: [{
        url: '/settings/inventory/product-categories',
        text: 'Product Categories'
      }, {
        url: '/settings/inventory/uom',
        text: 'Units of Measurements'
      }
      // , {
      //   url: '/settings/inventory/numerics',
      //   text: 'Numeration Formats'
      // }
      ]
    }, {
      url: '/settings/system',
      text: 'System',
      nestedMenu: true,
      nestedItems: [{
        url: '/settings/system/users',
        text: 'Users'
      }, {
        url: '/settings/system/locations',
        text: 'Locations'
      },
      //  {
      //   url: '/settings/system/currencies',
      //   text: 'Currencies'
      // }, {
      //   url: '/settings/system/holidays',
      //   text: 'Holidays'
      // },
      {
        url: '/settings/system/taxes',
        text: 'Taxes'
      }, {
        url: '/settings/system/payment-terms',
        text: 'Payment Terms'
      }, {
        url: '/settings/system/price-lists',
        text: 'Price Lists'
      }
      // , {
      //   url: '/settings/system/account-details',
      //   text: 'Account Details'
      // }
      ]
    }
  ]
};
