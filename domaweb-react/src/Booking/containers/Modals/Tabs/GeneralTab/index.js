import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import { Field } from 'react-final-form';
import DatePicker from 'react-datepicker';

import TimeInput from './components/TimeInput';
import DropdownSelect from '../../../../../sharedComponents/DropdownSelect/index';
import DomaDatePickerFormat from '../../../../../sharedComponents/DomaDatePickerFormat/index';

import { getformatedTimeDuration } from '../../../../../utils/dateUtil';

import styles from '../../../TimelineCalendar/DomaBooking-styles.scss';
import timestyles from '../../../../../sharedComponents/DomaTimePicker/DomaTimePicker-styles.scss';
import DomaDatePicker from '../../../../../sharedComponents/DomaDatePicker';


export default class GeneralTab extends PureComponent {
  constructor(props) {
    super(props);
    let startTime;
    let endTime;
    let realizedStartDate;
    let realizedEndDate;
    if (props.taskdetails) {
      startTime = moment(props.taskdetails.plannedStartTime);
      endTime = moment(props.taskdetails.plannedEndTime);
      realizedStartDate = props.taskdetails.realizedStartTime ? moment(props.taskdetails.realizedStartTime) : moment(props.taskdetails.plannedStartTime);
      realizedEndDate = props.taskdetails.realizedEndTime ? moment(props.taskdetails.realizedEndTime) : moment(props.taskdetails.plannedEndTime);
    } else {
      startTime = moment(props.canvasdatetime);
      endTime = moment(props.canvasdatetime).add('1', 'hours');
      realizedStartDate = moment(props.canvasdatetime);
      realizedEndDate = moment(props.canvasdatetime).add('1', 'hours');
    }
    this.state = {
      isCanceled: false,
      hideBasicInfo: false,
      startDate: startTime,
      endDate: endTime,
      startTime,
      endTime,
      datePickerError: '',
      realizedStartDate,
      realizedEndDate,
      realizedStartTime: realizedStartDate,
      realizedEndTime: realizedEndDate,
      open: false,
    };
  }

  handlePlannedDate = (date, type) => this.setState({ [type]: date }, () => this.updatePlannedDate());

  updatePlannedDate = () => {
    // create new start date
    const startDate = this.state.startDate.format('DD/MM/YYYY');
    const startTime = this.state.startTime.format('HH:mm:ss');
    const startDateWithTime = `${startDate} ${startTime}`;
    const newStartTime = moment(startDateWithTime, 'DD/MM/YYYY HH:mm:ss');

    // create new end date
    const endDate = this.state.endDate.format('DD/MM/YYYY');
    const endTime = this.state.endTime.format('HH:mm:ss');
    const endDateWithTime = `${endDate} ${endTime}`;
    let newEndTime = moment(endDateWithTime, 'DD/MM/YYYY HH:mm:ss');

    const diffInMins = newEndTime.diff(newStartTime, 'minutes');

    if (diffInMins <= 0) {
      newEndTime = newStartTime.clone().add(1, 'hours');
    }

    this.setState({
      startDate: newStartTime,
      endDate: newEndTime,
      startTime: newStartTime,
      endTime: newEndTime,
    }, () => this.props.handledatevalues(this.state.startDate, this.state.endDate));

    if (diffInMins > 1440) {
      this.setState({ datePickerError: 'The length of task is more than 24 hrs!' });
    } else {
      this.setState({ datePickerError: '' });
    }
  }

  handleRealizedDate = (date, type) => this.setState({ [type]: date }, () => this.updateRealizedDate());

  updateRealizedDate = () => {
    // create new start date
    const startDate = this.state.realizedStartDate.format('DD/MM/YYYY');
    const startTime = this.state.realizedStartTime.format('HH:mm:ss');
    const startDateWithTime = `${startDate} ${startTime}`;
    const newStartTime = moment(startDateWithTime, 'DD/MM/YYYY HH:mm:ss');

    // create new end date
    const endDate = this.state.realizedEndDate.format('DD/MM/YYYY');
    const endTime = this.state.realizedEndTime.format('HH:mm:ss');
    const endDateWithTime = `${endDate} ${endTime}`;
    let newEndTime = moment(endDateWithTime, 'DD/MM/YYYY HH:mm:ss');

    const diffInMins = newEndTime.diff(newStartTime, 'minutes');

    if (diffInMins <= 0) {
      newEndTime = newStartTime.clone().add(1, 'hours');
    }

    this.setState({
      realizedStartDate: newStartTime,
      realizedEndDate: newEndTime,
      realizedStartTime: newStartTime,
      realizedEndTime: newEndTime,
    }, () => this.props.handlerealizeddates(this.state.realizedStartDate, this.state.realizedEndDate));
  }

  render() {
    const dateInput = props =>
      <DomaDatePicker
        placeholderText={props.placeholderText}
        className={props.className}
        selected={props.selected}
        onChange={props.onchange}
        type={props.type}
        {...props}
      />

    // TimePiсker wrapper for the DomaTimePicker sharedComponent
    const timeInput = props => (
      <TimeInput
        classname={timestyles.timepicker}
        onchange={props.onchange}
        selected={props.selected}
        disabled={props.disabled}
        type={props.type}
      />
    );

    return (
      <div className={styles.content__section}>
        <Row>
          <h4 className={styles.task__header}>Customer(s)</h4>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>
                Customer
              </ControlLabel>
              <DropdownSelect
                name="customerId"
                data={this.props.customerresources}
                defaultvalue={this.props.modaltype === 'EditModal' && this.props.taskdetails.customerId}
                onchange={this.props.handlecustomerdd}
                className={(this.props.errors.customerId && (this.props.modaltype === 'AddModal')) ? `${styles.general__dropdown_error}` : ''}
                isError={this.props.errors.customerId && (this.props.modaltype === 'AddModal') && true}
              />
              {this.props.errors.customerId && <p className={styles.error}>{this.props.customerError}</p>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <h4 className={styles.task__header}>Task details</h4>
        </Row>
        <Row>
          <Col xs={4} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Task type</ControlLabel>
              <DropdownSelect
                name="itemTypeId"
                data={this.props.tasktypeservices || this.props.bookingtypes}
                defaultvalue={this.props.modaltype === 'EditModal' && this.props.taskdetails.itemTypeId}
                onchange={this.props.handletasktypedd}
                tasktypevalue={this.props.tasktypevalue}
                tasktypeonchange={this.props.tasktypeonchange}
              />
            </FormGroup>
          </Col>
          <Col xs={2} md={2}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Start date</ControlLabel>
              <Field
                render={dateInput}
                onchange={this.handlePlannedDate}
                selected={this.state.startDate}
                name="plannedStartTime"
                disabled={this.props.modaltype === 'EditModal' && this.props.values.itemState !== 'UNCONFIRMED'}
                type="startDate"
                className={styles.example_custom_input}
              />
            </FormGroup>
          </Col>
          <Col xs={2} md={2} className={styles.timepicker}>
            <Field
              render={timeInput}
              onchange={this.handlePlannedDate}
              selected={this.state.startTime}
              name="startTime"
              disabled={this.props.modaltype === 'EditModal' && this.props.values.itemState !== 'UNCONFIRMED'}
              type="startTime"
            />
          </Col>
          <Col xs={2} md={2}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>End date</ControlLabel>
              <Field
                render={dateInput}
                onchange={this.handlePlannedDate}
                selected={this.state.endDate}
                name="plannedEndTime"
                disabled={this.props.modaltype === 'EditModal' && this.props.values.itemState !== 'UNCONFIRMED'}
                type="endDate"
                className={styles.example_custom_input}
              />
            </FormGroup>
          </Col>
          <Col xs={2} md={2} className={styles.timepicker}>
            <Field
              render={timeInput}
              onchange={this.handlePlannedDate}
              selected={this.state.endTime}
              name="endTime"
              disabled={this.props.modaltype === 'EditModal' && this.props.values.itemState !== 'UNCONFIRMED'}
              type="endTime"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Status</ControlLabel>
              <DropdownSelect
                name="itemState"
                data={this.props.itemstatus}
                defaultvalue={this.props.modaltype === 'EditModal' ? this.props.taskdetails.itemState : 'UNCONFIRMED'}
              />
            </FormGroup>
          </Col>
          <Col xs={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>
                estimated duration
              </ControlLabel>
              <p className={styles.duration__label_1}>
                <span className={styles.task__modal__well}>
                  {getformatedTimeDuration(this.state.startDate, this.state.endDate)}
                </span>
              </p>
            </FormGroup>
          </Col>
          <Col xs={4}>
            <p className={styles.general__tasklength_warning}>
              {this.state.datePickerError}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Realized Start time</ControlLabel>
              <Field
                render={dateInput}
                onchange={this.handleRealizedDate}
                selected={this.state.realizedStartDate}
                name="realizedStartTime"
                disabled={
                  (this.props.values.itemState === 'UNCONFIRMED' && true) ||
                  (this.props.values.itemState === 'CONFIRMED' && false) ||
                  (this.props.values.itemState === 'FINISHED' && false)
                }
                type="realizedStartDate"
                className={styles.example_custom_input}
              />
            </FormGroup>
          </Col>
          <Col xs={2} md={2} className={styles.timepicker}>
            <Field
              render={timeInput}
              onchange={this.handleRealizedDate}
              selected={this.state.realizedStartTime}
              name="realizedStartMins"
              disabled={
                (this.props.values.itemState === 'UNCONFIRMED' && true) ||
                (this.props.values.itemState === 'CONFIRMED' && false) ||
                (this.props.values.itemState === 'FINISHED' && false)
              }
              type="realizedStartTime"
            />
          </Col>
          <Col xs={4} md={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Realized End time</ControlLabel>
              <Field
                render={dateInput}
                onchange={this.handleRealizedDate}
                selected={this.state.realizedEndDate}
                name="realizedEndDate"
                disabled={
                  (this.props.values.itemState === 'UNCONFIRMED' && true) ||
                  (this.props.values.itemState === 'CONFIRMED' && true) ||
                  (this.props.values.itemState === 'FINISHED' && false)
                }
                type="realizedEndDate"
                className={styles.example_custom_input}
              />
            </FormGroup>
          </Col>
          <Col xs={2} md={2} className={styles.timepicker}>
            <Field
              render={timeInput}
              onchange={this.handleRealizedDate}
              selected={this.state.realizedEndTime}
              name="realizedEndMins"
              disabled={
                (this.props.values.itemState === 'UNCONFIRMED' && true) ||
                (this.props.values.itemState === 'CONFIRMED' && true) ||
                (this.props.values.itemState === 'FINISHED' && false)
              }
              type="realizedEndTime"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={12}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Description</ControlLabel>
              <Field
                name="info"
                component="textarea"
                placeholder={this.props.modaltype === 'EditModal' ? this.props.taskdetails.info : ''}
                className="form-control"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel
                className={
                  this.props.errors.taskGroupId && this.props.modaltype === 'AddModal' ?
                  `${styles.error}` : ''
                }
              >
                Group
              </ControlLabel>
              <DropdownSelect
                name="taskGroupId"
                label="taskGroupId"
                fieldName="title"
                data={this.props.groupgroups}
                defaultvalue={
                  this.props.modaltype === 'EditModal' ?
                  this.props.taskdetails.taskGroupId :
                  this.props.groupid
                }
                onchange={this.props.handletasktypedd}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <div className={styles.group__chkbox}>
            <ul className={styles.chk__ul}>
              <li className="chk__item">
                <Field
                  name="isCanceled"
                  component="input"
                  type="checkbox"
                  ref="isCanceledInput"
                  checked={this.state.isCanceled}
                  value={this.state.isCanceled}
                  onChange={(event) => {
                    this.refs.isCanceledInput.handlers.onChange(event.target.value !== 'true');
                    this.setState({ isCanceled: event.target.value !== 'true' });
                  }}
                  id="inputIsCanceled"
                />
                <label className={styles.general__input_label} htmlFor="inputIsCanceled">
                  &nbsp;Cancelled
                </label>
              </li>
              <li className="chk__item">
                <Field
                  name="hideBasicInfo"
                  component="input"
                  type="checkbox"
                  ref="hideBasicInfoInput"
                  checked={this.state.hideBasicInfo}
                  value={this.state.hideBasicInfo}
                  onChange={(event) => {
                    this.refs.hideBasicInfoInput.handlers.onChange(event.target.value !== 'true');
                    this.setState({ hideBasicInfo: event.target.value !== 'true' });
                  }}
                  id="hideMobileBasicInfo"
                />
                <label className={styles.general__input_label} htmlFor="hideMobileBasicInfo">
                  &nbsp;Hide description in the mobile
                </label>
              </li>
            </ul>
          </div>
        </Row>
        <Row>
          <Col xs={6} md={6} lg={12}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Employee qualification needed in the task </ControlLabel>
              <ul className={styles.chk__ul}>
                <li className="chk__item">
                  <input
                    type="checkbox"
                    id="womanCheckbox"
                    className={styles.checkbox}
                  />
                  <label className={styles.general__input_label} htmlFor="womanCheckbox">
                    &nbsp;Women
                  </label>
                </li>
                <li className="chk__item">
                  <input
                    type="checkbox"
                    id="swedishSpeakingCheckbox"
                    className={styles.checkbox}
                  />
                  <label className={styles.general__input_label} htmlFor="swedishSpeakingCheckbox">
                    &nbsp;Swedish speaking
                  </label>
                </li>
                <li className="chk__item">
                  <input
                    type="checkbox"
                    id="heavyWeightCheckbox"
                    className={styles.checkbox}
                  />
                  <label className={styles.general__input_label} htmlFor="heavyWeightCheckbox">
                    &nbsp;Can lift heavy weights
                  </label>
                </li>
                <li className="chk__item">
                  <input
                    type="checkbox"
                    id="nurseCheckbox"
                    className={styles.checkbox}
                  />
                  <label className={styles.general__input_label} htmlFor="nurseCheckbox">
                    &nbsp;Nurse
                  </label>
                </li>
              </ul>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <h4 className={styles.task__header}>Employee(s)</h4>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Employees</ControlLabel>
              <DropdownSelect
                name="employeeId"
                label="Customers"
                fieldName="title"
                data={this.props.employeesgroup}
                defaultvalue={this.props.modaltype === 'EditModal' ? this.props.taskdetails.employeeId : this.props.groupid}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <h4 className={styles.task__header}>Resource(s)</h4>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Resource(s)</ControlLabel>
              <DropdownSelect
                name="resource"
                label="resource"
                fieldName="resource"
                data={[]}
                defaultvalue={null}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

GeneralTab.propTypes = {
  handletasktypedd: PropTypes.func,
  info: PropTypes.string,
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  taskdetails: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  customerresources: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  employeesgroup: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  groupgroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  itemstatus: PropTypes.arrayOf(PropTypes.string),
  bookingtypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  errors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  modaltype: PropTypes.string,
  canvasdatetime: PropTypes.instanceOf(Date),
  handledatevalues: PropTypes.func,
  groupid: PropTypes.number,
  handlecustomerdd: PropTypes.func,
  handlerealizeddates: PropTypes.func,
  tasktypeonchange: PropTypes.func,
  tasktypeservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  customerError: PropTypes.string,
  tasktypevalue: PropTypes.string,
};
