/* eslint-disable react/jsx-filename-extension, react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  ConnectedCoreLayout,
  ConnectedLoginPage,
  ConnectedLoadingDataPage,
  // Sales
  ConnectedOrder,
  ConnectedOrders,
  ConnectedPromotions,
  ConnectedPromotion,
  ConnectedCustomers,
  ConnectedCustomer,
  ConnectedCustomerProfile,
  // Inventory
  Transactions,
  ConnectedItems,
  ConnectedItem,
  ConnectedStockCounts,
  ConnectedStockCount,
  ConnectedAdjustments,
  ConnectedNewAdjustment,
  ConnectedBundles,
  ConnectedBundle,
  // Purchase
  PurchaseOrders,
  PurchaseOrder,
  Suppliers,
  ConnectedSupplier,
  // Settings
  // Sales
  Sales,
  ConnectedChannels,
  ConnectedChannel,
  ConnectedFulfilment,
  ConnectedFulfilmentItem,
  // Inventory
  Inventory,
  ConnectedUOM,
  ConnectedProductCategories,
  ConnectedPriceLists,
  PriceList,
  ConnectedNumerationFormats,
  // System
  System,
  ConnectedUsers,
  Rights,
  Roles,
  ConnectedLocations,
  PaymentTerms,
  ConnectedTaxes
} from 'containers';

const routes = (getState) => {
  const PrivateRoute = ({ component, ...rest }) => (
    <Route
      { ...rest }
      render={ (props) => {
        const state = getState();

        if (!state.login.user) {
          return (
            <Redirect
              to={ {
                pathname: '/login',
                state: {
                  redirectFrom: props.location.pathname
                }
              } }
            />
          );
        }

        return state.login.user && state.commonData.commonDataLoaded
          ? React.createElement(component)
          : <Redirect
            to={ {
              pathname: '/loading',
              state: {
                redirectFrom: props.location.pathname,
                id: props.match.params.id
              }
            } }
          />;
      } }
    />
  );

  return (
    <ConnectedCoreLayout>
      <Switch>
        <Route exact path="/" component={ ConnectedLoginPage } />
        <Route path="/login" component={ ConnectedLoginPage } />
        <Route path="/loading" component={ ConnectedLoadingDataPage } />
        { /* Sales */ }
        <PrivateRoute exact path="/sales/orders" component={ ConnectedOrders } />
        <PrivateRoute exact path="/sales/orders/:id" component={ ConnectedOrder } />
        <PrivateRoute exact path="/sales/promotions" component={ ConnectedPromotions } />
        <PrivateRoute exact path="/sales/promotions/:id/:code?" component={ ConnectedPromotion } />
        <PrivateRoute exact path="/sales/customers" component={ ConnectedCustomers } />
        <PrivateRoute exact path="/sales/customers/new" component={ ConnectedCustomer } />
        <PrivateRoute exact path="/sales/customers/:id/:name" component={ ConnectedCustomerProfile } />
        { /* Inventory */ }
        <PrivateRoute exact path="/inventory/transactions" component={ Transactions } />

        <PrivateRoute exact path="/inventory/all-items" component={ ConnectedItems } />
        <PrivateRoute exact path="/inventory/all-items/:id" component={ ConnectedItem } />

        <PrivateRoute exact path="/inventory/stock-count" component={ ConnectedStockCounts } />
        <PrivateRoute exact path="/inventory/stock-count/:id/:name?" component={ ConnectedStockCount } />

        <PrivateRoute exact path="/inventory/adjustments" component={ ConnectedAdjustments } />
        <PrivateRoute exact path="/inventory/adjustments/new" component={ ConnectedNewAdjustment } />
        <PrivateRoute exact path="/inventory/item-bundles" component={ ConnectedBundles } />
        <PrivateRoute exact path="/inventory/item-bundles/:id" component={ ConnectedBundle } />
        { /* Purchase */ }
        <PrivateRoute exact path="/purchase/orders" component={ PurchaseOrders } />
        <PrivateRoute exact path="/purchase/orders/:id/:name?" component={ PurchaseOrder } />
        <PrivateRoute exact path="/purchase/suppliers" component={ Suppliers } />
        <PrivateRoute exact path="/purchase/suppliers/:id/:name?" component={ ConnectedSupplier } />
        { /* Settings */ }
        { /* ~Sales */ }
        <PrivateRoute exact path="/settings/sales" component={ Sales } />
        <PrivateRoute exact path="/settings/sales/channels" component={ ConnectedChannels } />
        <PrivateRoute exact path="/settings/sales/channels/:id/:name" component={ ConnectedChannel } />
        <PrivateRoute exact path="/settings/sales/fulfilment" component={ ConnectedFulfilment } />
        <PrivateRoute exact path="/settings/sales/fulfilment/:item/:name" component={ ConnectedFulfilmentItem } />
        { /* ~Inventory */ }
        <PrivateRoute exact path="/settings/inventory" component={ Inventory } />
        <PrivateRoute exact path="/settings/inventory/uom" component={ ConnectedUOM } />
        <PrivateRoute exact path="/settings/inventory/product-categories" component={ ConnectedProductCategories } />
        <PrivateRoute exact path="/settings/inventory/numerics" component={ ConnectedNumerationFormats } />
        { /* ~System */ }
        <PrivateRoute exact path="/settings/system" component={ System } />
        <PrivateRoute exact path="/settings/system/users" component={ ConnectedUsers } />
        <PrivateRoute exact path="/settings/system/roles" component={ Roles } />
        <PrivateRoute exact path="/settings/system/rights" component={ Rights } />
        <PrivateRoute exact path="/settings/system/locations" component={ ConnectedLocations } />
        <PrivateRoute exact path="/settings/system/payment-terms" component={ PaymentTerms } />
        <PrivateRoute exact path="/settings/system/taxes" component={ ConnectedTaxes } />
        <PrivateRoute exact path="/settings/system/price-lists" component={ ConnectedPriceLists } />
        <PrivateRoute exact path="/settings/system/price-lists/:id/:code?" component={ PriceList } />
      </Switch>
    </ConnectedCoreLayout>
  );
};

export default routes;
