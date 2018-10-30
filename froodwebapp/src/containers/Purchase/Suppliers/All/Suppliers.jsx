import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { SUPPLIERS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './suppliersHelpers';

const mapStateToProps = state => getMainContainerState(state, 'suppliers');

const mapDispatchToProps = SUPPLIERS_REQUESTS;

export const AllSuppliers = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by supplier name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Supplier"
    newButtonLink="/purchase/suppliers/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }
    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliers);
