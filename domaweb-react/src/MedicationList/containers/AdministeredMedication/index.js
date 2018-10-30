/*
 *
 * AdministeredMedication
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectAdministeredMedication from './selectors';
import Expand from '../../../sharedComponents/ExpandableHeader';
import AdministeredTable from '../../components/AdministeredTable';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class AdministeredMedication extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { headerBlue, headerPurple } = this.context;
    const { temporary, whenNeeded } = this.props.AdministeredMedication;
    console.log(this.props);
    return (
      <div>
        <Expand color={headerPurple} text={<FormattedMessage {...messages.temporary} />} number={temporary.length}>
          <AdministeredTable showDate medication={temporary} />
        </Expand>
        <Expand color={headerBlue} text={<FormattedMessage {...messages.whenNeeded} />} number={whenNeeded.length}>
          <AdministeredTable showDate medication={whenNeeded} />
        </Expand>
      </div>
    );
  }
}

AdministeredMedication.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AdministeredMedication: makeSelectAdministeredMedication(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

AdministeredMedication.contextTypes = {
  headerPurple: PropTypes.string,
  headerBlue: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministeredMedication);
