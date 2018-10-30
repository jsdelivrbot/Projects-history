/* eslint-disable indent */
// Common
export ConnectedCoreLayout from './Common/CoreLayout/CoreLayout';
export ConnectedLoginPage from './Common/LoginPage/LoginPage';
export ConnectedMainContainer from './Common/MainContainer/MainContainer';
export ConnectedLoadingDataPage from './Common/LoadingDataPage/LoadingDataPage';

// Sales
  // Orders
export ConnectedOrders from './Sales/Orders/All/Orders';
export ConnectedOrder from './Sales/Orders/Single/Order';
  // Promotions
export ConnectedPromotions from './Sales/Promotions/All/Promotions';
export ConnectedPromotion from './Sales/Promotions/Single/Promotion';
  // Customers
export ConnectedCustomers from './Sales/Customers/All/Customers';
export ConnectedCustomer from './Sales/Customers/New/Customer';
export ConnectedCustomerProfile from './Sales/Customers/Profile/CustomerProfile';

// Inventory
  // Items
export ConnectedItems from './Inventory/Items/All/Items';
export ConnectedItem from './Inventory/Items/Single/Item';
  // Transactions
export Transactions from './Inventory/Transactions/Transactions';
    // Adjustments
export ConnectedAdjustments from './Inventory/Transactions/Adjustments/All/Adjustments';
export ConnectedNewAdjustment from './Inventory/Transactions/Adjustments/New/NewAdjustment';
    // Stock counts
export ConnectedStockCounts from './Inventory/Transactions/StockCount/All/StockCounts';
export ConnectedStockCount from './Inventory/Transactions/StockCount/Single/StockCountContainer';

  // Bundles
export ConnectedBundles from './Inventory/Bundles/All/Bundles';
export ConnectedBundle from './Inventory/Bundles/Single/Bundle';

// Purchase
  // Orders
export PurchaseOrders from './Purchase/Orders/All/Orders';
export PurchaseOrder from './Purchase/Orders/Single/Order';
  // Suppliers
export Suppliers from './Purchase/Suppliers/All/Suppliers';
export ConnectedSupplier from './Purchase/Suppliers/Single/Supplier';

// Settings
  // Sales
export Sales from './Settings/Sales/Sales';
export ConnectedFulfilment from './Settings/Sales/Fulfilment/All/Fulfilment';
export ConnectedFulfilmentItem from './Settings/Sales/Fulfilment/Single/FulfilmentItem';
export ConnectedChannels from './Settings/Sales/Channels/Channels';
export ConnectedChannel from './Settings/Sales/Channel/Channel';
  // Inventory
export Inventory from './Settings/Inventory/Inventory';
export ConnectedUOM from './Settings/Inventory/UOM/UOM';
export ConnectedProductCategories from './Settings/Inventory/ProductCategories/ProductCategories';
export ConnectedNumerationFormats from './Settings/Inventory/NumerationFormats/NumerationFormats';
  // System
export System from './Settings/System/System';
export ConnectedPriceLists from './Settings/System/PriceLists/All/PriceLists';
export PriceList from './Settings/System/PriceLists/Single/PriceListContainer';
export ConnectedUsers from './Settings/System/Users/Users';
export ConnectedLocations from './Settings/System/Locations/Locations';
export PaymentTerms from './Settings/System/PaymentTerms/PaymentTerms';
export ConnectedTaxes from './Settings/System/Taxes/Taxes';
