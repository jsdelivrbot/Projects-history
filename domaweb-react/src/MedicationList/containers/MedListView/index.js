/*
 *
 * MedListView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectMedListView, { selectMedListViewDomain, makeSelectTabs, selectMainModal } from './selectors';
import makeSelectCustomerMedication from '../CustomerMedication/selectors';
import messages from './messages';
import { Modal, Col, Row, Button, Table } from 'react-bootstrap';
import { toggleMedView, toggleTabs, toggleCheckLog, setModalStatus } from './actions';
import styles from './medListView.scss';
import DomaButton from '../../../sharedComponents/Button';
import CurrentMedication from '../../components/CurrentMedication';
import ControlBar from '../../components/ControlBar';
import Icon from 'react-icons-kit';
import MedHeader from '../../components/MedicationHeaderHoc';
import Allergies from '../Allergies';
import AdministeredMedication from '../AdministeredMedication';
import CheckLog from '../CheckLog';
import IconToolBar from './IconToolBar';
import AddNewMedication from '../AddNewMedication';

const iconStyles = { marginLeft: '10px', float: 'right', cursor: 'pointer', fontSize: '0.7em' };
const iconSize = 30;

//const IconButton = ({children, text}) => <span style={iconStyles}>{text}{children}</span>

export class MedListView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  getChildContext() {
    return {
      headerPurple: '#ee1f79',
      headerGreen: '#8cc540',
      headerBlue: '#07adf2',
      headerOrange: '#f69419',
      buttonGrey: '#a7a7a7',
      buttonWidth: '3em',
      height: '3em',
    };
  }
  render() {
    console.log(this.props);
    let buttonStyle = { backgroundColor: '#a7a7a7', width: '3em', height: '3em' };
    const { modal, log } = this.props.view;
    const { toggle, tabs, switchTab, customerMedication, toggleCheckLog } = this.props;
    const { continuous, temporary, whenNeeded, coming } = customerMedication;
    const headerTabs = Object.keys(tabs);

    return (
      <div>
      <CheckLog show={log} toggle={toggleCheckLog} />
      <AddNewMedication customerId={this.props.customerId} />
      {/*MAIN VIEW*/}
      <Modal bsSize="large" show={modal} onHide={() => toggle(modal)}>
        <MedHeader>
          <Modal.Header>
            <Modal.Title>
                <IconToolBar />
            </Modal.Title>
          </Modal.Header>
        </MedHeader>
        <Modal.Body>
          <Row>
            <ControlBar
              tabs={headerTabs}
              values={tabs}
              switchTab={switchTab}
            />
            {tabs.currentMedication && <CurrentMedication />}
            {tabs.allergies && <Allergies />}
            {tabs.administered && <AdministeredMedication />}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <DomaButton clickHandler={() => toggle(modal)} text="Close" styles={buttonStyle} />
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

MedListView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  customerId: PropTypes.string || PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  view: makeSelectMedListView(),
  tabs: makeSelectTabs(),
  customerMedication: makeSelectCustomerMedication(),
  //modal: selectMainModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggle: (props) => dispatch(setModalStatus(props)),
    switchTab: tab => dispatch(toggleTabs(tab)),
    toggleCheckLog: (status) => dispatch(toggleCheckLog(status)),
  };
}

MedListView.childContextTypes = {
  headerPurple: PropTypes.string,
  headerGreen: PropTypes.string,
  headerBlue: PropTypes.string,
  headerOrange: PropTypes.string,
  buttonGrey: PropTypes.string,
  buttonWidth: PropTypes.string,
  height: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedListView);
