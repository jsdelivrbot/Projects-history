import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import {
  ORDERS_REQUESTS,
  ordersGetInvoiceRequest,
} from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './ordersHelpers';

const mapStateToProps = state => ({
  ...getMainContainerState(state, 'orders'),
  // optional
  downloadedItem: state.download.downloadedItem
});

const mapDispatchToProps = {
  ...ORDERS_REQUESTS,
  downloadItemRequest: ordersGetInvoiceRequest
};

export const Orders = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by order number or customer name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Order"
    newButtonLink="/sales/orders/new"

    // table
    actionColumnVisible
    getRowClickRedirectLink={ getRowClickRedirectLink }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }

    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
