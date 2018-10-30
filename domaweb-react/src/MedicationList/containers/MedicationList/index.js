/*
 *
 * MedicationList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectMedicationList from './selectors';
import messages from './messages';
import MedListView from '../MedListView';
import Auth from '../../../sharedComponents/AuthRequired';
import { initMedicationList } from './actions';
import AddNewMedication from '../AddNewMedication';

export class MedicationList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.init(this.props.custId);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.custId !== nextProps.custId) {
      return true;
    } return false;
  }
  componentDidUpdate() {
    this.props.init(this.props.custId);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <MedListView customerId={this.props.custId} />
        {/*<AddNewMedication customerId={this.props.custId} />*/}
      </div>
    );
  }
}

MedicationList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //MedicationList: makeSelectMedicationList(),
});

function mapDispatchToProps(dispatch) {
  return {
    init: custId => dispatch(initMedicationList(custId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth(MedicationList));
