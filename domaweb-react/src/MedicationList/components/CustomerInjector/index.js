import React from 'react'; 
import PropTypes from 'prop-types'
// import styled from 'styled-components';
import { onlyUpdateForKeys } from 'recompose';
import MedicationList from '../../containers/MedicationList'
import { toggleMedView, toggleTabs } from '../../containers/MedListView/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MedicationListPopup from '../../../sharedComponents/MedicationListPopup';
import { Button } from 'react-bootstrap';

const CustomerInjector = ({ params, toggle }) => {
  const { customerId } = params;
  toggle();
  return(
    <div>
      <MedicationList custId={customerId} />
      <MedicationListPopup>
        <Button>Avaa lääkelista</Button>
      </MedicationListPopup>
    </div>
  );
};

/*const mapStateToProps = createStructuredSelector({
  //medication: makeSelectCustomerMedication(),
});*/

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleMedView()),
    switchTab: tab => dispatch(toggleTabs(tab)),
  };
}

CustomerInjector.propTypes = {

};

export default connect(null, mapDispatchToProps)(CustomerInjector);
