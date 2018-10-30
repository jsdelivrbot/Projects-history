import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { BUNDLES_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getRowClickRedirectLink
} from './bundlesHelpers';

const mapStateToProps = state => getMainContainerState(state, 'bundles');

const mapDispatchToProps = BUNDLES_REQUESTS;

export const Bundles = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by sku code"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Bundle"
    newButtonLink="/inventory/item-bundles/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
