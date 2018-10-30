import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { CUSTOMERS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './customersHelpers';

const mapStateToProps = state => getMainContainerState(state, 'customers');

const mapDispatchToProps = CUSTOMERS_REQUESTS;

export const Customers = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by customer name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Customer"
    newButtonLink="/sales/customers/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }
    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
