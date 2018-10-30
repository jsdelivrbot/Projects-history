import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { ITEMS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getRowClickRedirectLink
} from './itemsHelpers';

const mapStateToProps = state => getMainContainerState(state, 'items');

const mapDispatchToProps = ITEMS_REQUESTS;

export const Items = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by sku code"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Inventory"
    newButtonLink="/inventory/all-items/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Items);
