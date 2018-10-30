import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { STOCK_COUNTS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './stockCountHelpers';

const mapStateToProps = state => getMainContainerState(state, 'stockCounts');

const mapDispatchToProps = STOCK_COUNTS_REQUESTS;

export const StockCounts = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by code, delivery date, vendor name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Count"
    newButtonLink="/inventory/stock-count/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }
    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(StockCounts);
