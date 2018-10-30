import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { PROMOTIONS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getRowClickRedirectLink
} from './promotionsHelpers';

const mapStateToProps = state => getMainContainerState(state, 'promotions');

const mapDispatchToProps = PROMOTIONS_REQUESTS;

export const Promotions = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by promotion code"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Promotion"
    newButtonLink="/sales/promotions/new"

    // table
    actionColumnVisible={ false }
    getRowClickRedirectLink={ getRowClickRedirectLink }

    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
