/**
*
* CurrentMedication
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import MedicationTable from '../MedicationTable';
import Expand from '../../../sharedComponents/ExpandableHeader';
import makeSelectCustomerMedication from '../../containers/CustomerMedication/selectors';

function CurrentMedication({ medication }, { headerBlue, headerGreen, headerOrange, headerPurple }) {
  const { continuous, temporary, whenNeeded, coming } = medication;
  if (!medication) {
    return (
      <div>Patient has no current medication</div>
    );
  }
  return (
    <div>
      <Expand text={<FormattedMessage {...messages.continuous} />} color={headerGreen} number={continuous.length || null}>
        <MedicationTable medication={continuous} />
      </Expand>
      <Expand text={<FormattedMessage {...messages.temporary} />} color={headerPurple} number={temporary.length || null}>
        <MedicationTable medication={temporary} />
      </Expand>
      <Expand text={<FormattedMessage {...messages.whenNeeded} />} color={headerBlue} number={whenNeeded.length || null}>
        <MedicationTable medication={whenNeeded} />
      </Expand>
      <Expand text={<FormattedMessage {...messages.coming} />} color={headerOrange} number={coming.length || null}>
        <MedicationTable medication={coming} />
      </Expand>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  medication: makeSelectCustomerMedication(),
});

CurrentMedication.propTypes = {

};

CurrentMedication.contextTypes = {
  headerGreen: PropTypes.string,
  headerPurple: PropTypes.string,
  headerBlue: PropTypes.string,
  headerOrange: PropTypes.string,
}

export default connect(mapStateToProps, null)(CurrentMedication);
