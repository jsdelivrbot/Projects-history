/*
 *
 * AddNewMedication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectAddNewMedication, { selectMedicationDataset, selectTemplateValue, makeSelectMedicationTemplate, selectMedicationTemplate } from './selectors';
import messages from './messages';
import { getMedicationList, test, validateAll, initInfo, submit } from './actions';
import { Modal, Col, Row, Button, Clearfix } from 'react-bootstrap';
import { selectAddNewModal } from '../MedListView/selectors';
import { toggleAddNewModal, setAddNewModalStatus } from '../MedListView/actions';
import RadioGroup from '../../../sharedComponents/RadioGroup';
import RadioButton from '../../../sharedComponents/RadioButton';
import DomaButton from '../../../sharedComponents/Button';

//style and positioning related components
import HeaderHoc from '../../components/MedicationHeaderHoc'
import BarStyle from '../../components/ControlBarStyle';
import DosageWrapper from './DosageTimesWrapper';
import FullWidth from './FullWidthCol';
import DatePicker from '../../../sharedComponents/DomaDatePicker';
import HalfWidth from './HalfWidth';

import { 
  Name,
  Dosage,
  D1,
  D2,
  D3,
  D4,
  D5,
  Purpose,
  Notice,
  StartDate,
  EndDate,
  Type,
  Dispenser,
 } from './composedComponents';

 const buttonStyle = { backgroundColor: '#a7a7a7', width: '3em', height: '3em' };
 const float = { float: 'left' };
 const combinedStyles = Object.assign({}, float, buttonStyle);

export class AddNewMedication extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    //this.props.getList();
    this.props.validateAll();
    this.props.init({customerId: this.props.customerId});
  }
  render() {
    const { toggle, modal } = this.props;
    console.log('ew med');
    console.log(this.props);
    return (
      <Modal show={modal} onHide={() => toggle(modal)}>
        <HeaderHoc>
          <Modal.Header>
            <FormattedMessage {...messages.header} />
          </Modal.Header>
        </HeaderHoc>
        <Modal.Body>
          <Row>
            <BarStyle customStyles={{ backgroundColor: '#f7f7f7', textAlign: 'left' }}>
              <FormattedMessage {...messages.lastEdited} />
            </BarStyle>
            <FullWidth>
              <Name propName={'fullName'} maxSize={5} text={<FormattedMessage {...messages.selectMedicationName} />} returnObject />
              <Dosage required text={<FormattedMessage {...messages.dosage} />} />
            </FullWidth>
            <DosageWrapper>
              <D1 text={<FormattedMessage {...messages.morning} />} />
              <D2 text={<FormattedMessage {...messages.day} />} />
              <D3 text={<FormattedMessage {...messages.afternoon} />} />
              <D4 text={<FormattedMessage {...messages.evening} />} />
              <D5 text={<FormattedMessage {...messages.night} />} />
            </DosageWrapper>
            <FullWidth>
              <Purpose text={<FormattedMessage {...messages.purpose} />} area areaRows={4} />
              <Notice text={<FormattedMessage {...messages.notice} />} area areaRows={4} />
            </FullWidth>
            <HalfWidth>
              <FormattedMessage {...messages.startDate} />
              <FormattedMessage {...messages.endDate} />
            </HalfWidth>
            <Clearfix />
            <HalfWidth>
              <StartDate clearText={'Clear'} format='YYYY-MM-DDTHH:mm:ss' />
              <EndDate clearText={'Clear'} format='YYYY-MM-DDTHH:mm:ss' />
            </HalfWidth>
            <FullWidth>
              <Type text={<FormattedMessage {...messages.type} />}>
                <RadioButton value={'CONTINUOUS'} text={<FormattedMessage {...messages.continuous} />} />
                <RadioButton value={'TEMPORARY'} text={<FormattedMessage {...messages.temporary} />} />
                <RadioButton value={'WHEN_NEEDED'} text={<FormattedMessage {...messages.whenNeeded} />} />
              </Type>
              <Dispenser text={<FormattedMessage {...messages.dispenser} />}>
                <RadioButton value text={<FormattedMessage {...messages.inDispenser} />} />
                <RadioButton value={false} text={<FormattedMessage {...messages.noDispenser} />} />
              </Dispenser>
            </FullWidth>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <DomaButton clickHandler={toggle} text={<FormattedMessage {...messages.close} />} styles={combinedStyles} />
          <DomaButton text={<FormattedMessage {...messages.save} />} styles={buttonStyle} clickHandler={() => this.props.submit(this.props.customerId)} />
        </Modal.Footer>
      </Modal>
    );
  }
}

AddNewMedication.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //AddNewMedication: makeSelectAddNewMedication(),
  modal: selectAddNewModal(),
  //template: selectMedTemplateDirect(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggle: (props) => dispatch(setAddNewModalStatus(props)),
    getList: () => dispatch(getMedicationList()),
    test: () => dispatch(test()),
    validateAll: () => dispatch(validateAll()),
    init: (props) => dispatch(initInfo(props)),
    submit: (id) => dispatch(submit(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMedication);
