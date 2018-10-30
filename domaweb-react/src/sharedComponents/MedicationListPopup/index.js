import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import makeSelectCustomerMedication from '../../containers/CustomerMedication/selectors';
import { toggleMedView, toggleTabs, setModalStatus } from '../../MedicationList/containers/MedListView/actions';
//import { MedicationList } from '../../MedicationList/containers/MedicationList/index';
import selectModalStatus from './selectors';

function MedicationListPopup({ toggle, children, status, setStatus }) {
  return (
    <div onClick={() => setStatus(status)}>
      {/*<MedicationList custId={customerId} />*/}
      {children}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  status: selectModalStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleMedView()),
    switchTab: tab => dispatch(toggleTabs(tab)),
    setStatus: (props) => dispatch(setModalStatus(props)),
  };
}

MedicationListPopup.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MedicationListPopup);