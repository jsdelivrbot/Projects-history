import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import HolidaysRadioGroup from './components/HolidaysRadioGroup';
import styles from '../../../../TimelineCalendar/DomaBooking-styles.scss';
import modalTabSyles from '../../ModalTabs-styles.scss';
import DomaDatePicker from '../../../../../../sharedComponents/DomaDatePicker';

export default class EveryMonthWithDayOption extends PureComponent {
  constructor(props) {
    super(props);
    let startDate = moment();
    let endDate = moment().add('1', 'M');

    if (props.repetition.startDate) {
      startDate = moment(props.repetition.startDate, 'YYYY-MM-DD');
    }
    if (props.repetition.endDate) {
      endDate = moment(props.repetition.endDate, 'YYYY-MM-DD');
    }
    this.state = {
      dayOfWeek1: props.repetition.dayOfWeek1 || true,
      dayOfWeek2: props.repetition.dayOfWeek2 || false,
      dayOfWeek3: props.repetition.dayOfWeek3 || false,
      dayOfWeek4: props.repetition.dayOfWeek4 || false,
      dayOfWeek5: props.repetition.dayOfWeek5 || false,
      dayOfWeek6: props.repetition.dayOfWeek6 || false,
      dayOfWeek7: props.repetition.dayOfWeek7 || false,
      Everyday: false,
      startDate,
      endDate,
      option: props.repetition.option || 'ALLOW_SPECIAL_HOLIDAY',
      first: props.repetition.first || true,
      second: props.repetition.second || false,
      third: props.repetition.third || false,
      fourth: props.repetition.fourth || false,
      last: props.repetition.last || false,
      dateChanged: false,
      showEndDate: false,
    };
  }
  componentDidMount() {
    this.handlePayload();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formvalues !== nextProps.formvalues && !this.state.dateChanged) {
      if (!this.props.repetition.startDate) {
        this.setState({ startDate: moment(nextProps.formvalues.startDate) });
      }
      if (!this.props.repetition.endDate) {
        this.setState({ endDate: moment(nextProps.formvalues.endDate) });
      }
    }
  }

  handleStartDate = (value) => {
    const diffInMins = moment(this.state.endDate).diff(value, 'minutes');
    const diffInMonths = moment(this.state.endDate).diff(value, 'months');
    // const endDate = moment(value).add('1', 'M');

    if (diffInMonths < 12 && diffInMins > 0) {
      this.setState({
        startDate: value,
        dateChanged: true,
      }, () => this.handlePayload());
    } else {
      this.setState({
        startDate: value,
        endDate: value,
        dateChanged: true,
      }, () => this.handlePayload());
    }
  }

  handleEndDate = (value) => {
    const diffInMins = moment(value).diff(this.state.startDate, 'minutes');
    const diffInMonths = moment(value).diff(this.state.startDate, 'months');
    // const startDate = moment(value).subtract('1', 'M');

    if (diffInMonths < 12 && diffInMins > 0) {
      this.setState({
        endDate: value,
        dateChanged: true,
      }, () => this.handlePayload());
    } else {
      this.setState({
        endDate: value,
        dateChanged: true,
        startDate: value,
      }, () => this.handlePayload());
    }
  }

  handlePayload = () => {
    const startDate = this.state.startDate.format('YYYY-MM-DDTHH:mm:ss');
    const endDate = this.state.endDate.format('YYYY-MM-DDTHH:mm:ss');

    const newPayload = {
      repetitionType: 'EVERY_WEEK',
      startDate,
      option: this.state.option,
      comment: 'First Repetitive End Point',
      supressNotifications: false,
      dayOfWeek1: this.state.dayOfWeek1,
      dayOfWeek2: this.state.dayOfWeek2,
      dayOfWeek3: this.state.dayOfWeek3,
      dayOfWeek4: this.state.dayOfWeek4,
      dayOfWeek5: this.state.dayOfWeek5,
      dayOfWeek6: this.state.dayOfWeek6,
      dayOfWeek7: this.state.dayOfWeek7,
      first: this.state.first,
      second: this.state.second,
      third: this.state.third,
      fourth: this.state.fourth,
      last: this.state.last,
    };

    if (this.state.showEndDate) {
      newPayload.endDate = endDate;
    } else {
      delete newPayload.endDate;
    }

    this.props.loadrepetitionsview(this.props.repetition.id, newPayload);
  }

  handleDaySelect = (day) => {
    const arr = [
      this.state.dayOfWeek1,
      this.state.dayOfWeek2,
      this.state.dayOfWeek3,
      this.state.dayOfWeek4,
      this.state.dayOfWeek5,
      this.state.dayOfWeek6,
      this.state.dayOfWeek7,
    ];
    const checkTruthy = arr.filter(value => value);

    if (!this.state.Everyday) {
      if ((checkTruthy.length !== 1 && this.state[day]) || !this.state[day]) {
        this.setState({ [day]: !this.state[day] }, () => this.handlePayload());
      }
    }
  }

  handleEverydaySelect = () => {
    if (this.state.Everyday) {
      this.setState({ Everyday: false });
    } else {
      this.setState({
        Everyday: true,
        dayOfWeek1: true,
        dayOfWeek2: true,
        dayOfWeek3: true,
        dayOfWeek4: true,
        dayOfWeek5: true,
        dayOfWeek6: true,
        dayOfWeek7: true,
      }, () => this.handlePayload());
    }
  }

  handleRadioInput = (value) => {
    this.setState({ option: value }, () => this.handlePayload());
  }

  handleWeekSelect = (week) => {
    const arr = [
      this.state.first,
      this.state.second,
      this.state.third,
      this.state.fourth,
      this.state.last,
    ];
    const checkTruthy = arr.filter(value => value);

    if ((checkTruthy.length !== 1 && this.state[week]) || !this.state[week]) {
      this.setState({ [week]: !this.state[week] }, () => this.handlePayload());
    }
  }

  handleShowEndDateCheckbox = () => {
    // const endDate = moment(this.state.startDate).add('1', 'M');
    this.setState({
      showEndDate: !this.state.showEndDate,
      endDate: this.state.startDate,
    }, () => this.handlePayload());
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={4} md={4}>
            <FormGroup className={modalTabSyles.repetition__datepicker_row} controlId="formControlsSelect">
              <ControlLabel>Repeating in</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                value={this.props.repetition.repetitionType}
                onChange={this.props.handlechange}
              >
                <option value="EVERY_MONTH_WITH_DAY_OPTION">Every month with day option</option>
                <option value="EVERY_NDAY">Every n-day</option>
                <option value="EVERY_DAY">Every day</option>
                <option value="EVERY_WEEK">Every week</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={4} md={4}>
            <FormGroup className={modalTabSyles.repetition__datepicker_row} controlId="formControlsSelect">
              <ControlLabel>Start date</ControlLabel>
              <DomaDatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDate}
                type="none"
              />
            </FormGroup>
          </Col>
          <Col xs={4} md={4}>
            <div className={!this.state.showEndDate ? `${modalTabSyles.repetition__showEndDate_checkbox}` : ''}>
              <input
                name="EveryMonthShowEndDate"
                type="checkbox"
                checked={this.state.showEndDate}
                onChange={this.handleShowEndDateCheckbox}
                id={`checkbox ${this.props.repetition.id}`}
              />
              <label htmlFor={`checkbox ${this.props.repetition.id}`}>&nbsp;select end date</label>
            </div>
            {this.state.showEndDate &&
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>End date</ControlLabel>
              <DomaDatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDate}
                type="none"
              />
            </FormGroup>
            }
          </Col>
        </Row>
        <Row>
          <div className={styles.repetitions_tab_row_inner}>
            <FormGroup controlId="formControlsSelect">
              <ul className={styles.chk__ul}>
                <li className="chk__item">
                  <input
                    name="first"
                    checked={this.state.first}
                    type="checkbox"
                    onChange={e => this.handleWeekSelect(e.target.name)}
                  /> first
                </li>
                <li className="chk__item">
                  <input
                    name="second"
                    checked={this.state.second}
                    type="checkbox"
                    onChange={e => this.handleWeekSelect(e.target.name)}
                  /> second
                </li>
                <li className="chk__item">
                  <input
                    name="third"
                    checked={this.state.third}
                    type="checkbox"
                    onChange={e => this.handleWeekSelect(e.target.name)}
                  /> third
                </li>
                <li className="chk__item">
                  <input
                    name="fourth"
                    checked={this.state.fourth}
                    type="checkbox"
                    onChange={e => this.handleWeekSelect(e.target.name)}
                  /> fourth
                </li>
                <li className="chk__item">
                  <input
                    name="last"
                    checked={this.state.last}
                    type="checkbox"
                    onChange={e => this.handleWeekSelect(e.target.name)}
                  /> last
                </li>
              </ul>
            </FormGroup>
          </div>
        </Row>
        <Row>
          <div className={styles.repetitions_tab_row_inner}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select weekdays </ControlLabel>
              <ul className={styles.chk__ul}>
                <li className="chk__item">
                  <input
                    name="dayOfWeek1"
                    type="checkbox"
                    checked={this.state.dayOfWeek1}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Monday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek2"
                    type="checkbox"
                    checked={this.state.dayOfWeek2}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Tuesday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek3"
                    type="checkbox"
                    checked={this.state.dayOfWeek3}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Wednesday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek4"
                    type="checkbox"
                    checked={this.state.dayOfWeek4}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Thursday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek5"
                    type="checkbox"
                    checked={this.state.dayOfWeek5}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Friday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek6"
                    type="checkbox"
                    checked={this.state.dayOfWeek6}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Saturday
                </li>
                <li className="chk__item">
                  <input
                    name="dayOfWeek7"
                    type="checkbox"
                    checked={this.state.dayOfWeek7}
                    onChange={e => this.handleDaySelect(e.target.name)}
                  />
                  &nbsp;Sunday
                </li>
                <li className="chk__item">
                  <input
                    name="Everyday"
                    type="checkbox"
                    checked={this.state.Everyday}
                    onChange={this.handleEverydaySelect}
                  />
                  &nbsp;Everyday
                </li>
              </ul>
            </FormGroup>
          </div>
        </Row>
        <HolidaysRadioGroup
          handleradioinput={this.handleRadioInput}
          id={this.props.repetition.id}
          option={this.state.option}
        />
      </div>
    );
  }
}

EveryMonthWithDayOption.propTypes = {
  repetition: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  handlechange: PropTypes.func,
  loadrepetitionsview: PropTypes.func,
  formvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};
