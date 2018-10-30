import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import makeSelectCustomerMedication from '../../containers/CustomerMedication/selectors';
//import { toggleMedView, toggleTabs } from '../../AddNewMedication/containers/MedListView/actions';
import { toggleAddNewModal, setAddNewModalStatus } from '../../MedicationList/containers/MedListView/actions';
//import { AddNewMedication } from '../../AddNewMedication/containers/AddNewMedication/index';
import selectAddNewModalState from './selectors';

function AddNewMedicationPopup({ customerId, toggle, children, status, setStatus }) {
  return (
    <span onClick={() => setStatus(status)}>
      {/*<AddNewMedication custId={customerId} />*/}
      {children}
    </span>
  );
}

const mapStateToProps = createStructuredSelector({
  status: selectAddNewModalState(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleAddNewModal()),
    setStatus: (props) => dispatch(setAddNewModalStatus(props)),
    //switchTab: tab => dispatch(toggleTabs(tab)),
  };
}

AddNewMedicationPopup.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMedicationPopup);