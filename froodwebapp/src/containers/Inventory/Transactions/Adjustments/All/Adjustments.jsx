import React from 'react';
import { ConnectedMainContainer } from 'containers';
import { connect } from 'react-redux';
import { ADJUSTMENTS_REQUESTS } from 'redux-base/actions';
import { getMainContainerState } from 'utils';
import {
  renderItem,
  getStatisticsColumns
} from './adjustmentsHelpers';

const mapStateToProps = state => getMainContainerState(state, 'adjustments');

const mapDispatchToProps = ADJUSTMENTS_REQUESTS;

export const Adjustments = props => (
  <ConnectedMainContainer
    // autocomplete
    autocompletePlaceholder="Search by adjustment name"
    renderAutocompleteItem={ renderItem }

    // top buttons
    newButtonVisible
    newButtonText="New Adjustment"
    newButtonLink="/inventory/adjustments/new"

    // table
    actionColumnVisible={ false }

    // helpers
    getStatisticsColumns={ getStatisticsColumns }
    { ...props }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Adjustments);
