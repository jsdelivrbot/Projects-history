import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { PURCHASE_ORDERS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './purchasesHelpers';

const mapStateToProps = state => getMainContainerState(state, 'purchaseOrders');

const mapDispatchToProps = PURCHASE_ORDERS_REQUESTS;

export const Orders = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by code, delivery date, vendor name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Purchase"
    newButtonLink="/purchase/orders/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }
    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
