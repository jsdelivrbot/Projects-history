/*
 *
 * Allergies
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectAllergies from './selectors';
import messages from './messages';
import Expand from '../../../sharedComponents/ExpandableHeader';
import TextField from '../../../sharedComponents/TextFieldGeneric';
import MarevanTable from '../../components/MarevanTable';
import dummyData from './dummyMarevan.json';

export class Allergies extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { drugs, other } = this.props.allergies;
    const { headerPurple, headerGreen } = this.context;
    console.log(this.context.headerPurple);
    return (
      <div>
        <Expand color={headerGreen} text={<FormattedMessage {...messages.header} />}>
          <TextField color={'red'} areaRows={4} area value={drugs}>
            <FormattedMessage {...messages.drugs} />
          </TextField>
          <TextField color='red' areaRows={4} area value={other}>
            <FormattedMessage {...messages.other} />
          </TextField>
        </Expand>
        <Expand color={headerPurple} text={<FormattedMessage {...messages.marevan} />}>
          <MarevanTable dosage={dummyData} />
        </Expand>
      </div>
    );
  }
}

Allergies.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Allergies.contextTypes = {
  headerPurple: PropTypes.string,
  headerGreen: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  allergies: makeSelectAllergies(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Allergies);
