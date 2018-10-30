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
import styles from '../../ModalTabs-styles.scss';
import DomaDatePicker from '../../../../../../sharedComponents/DomaDatePicker';

export default class EveryDay extends PureComponent {
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
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Sunday: false,
      Saturday: false,
      Everyday: false,
      startDate,
      endDate,
      option: props.repetition.option || 'ALLOW_SPECIAL_HOLIDAY',
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
      repetitionType: 'EVERY_DAY',
      startDate,
      option: this.state.option,
      comment: 'First Repetitive End Point',
      supressNotifications: false,
    };

    if (this.state.showEndDate) {
      newPayload.endDate = endDate;
    } else {
      delete newPayload.endDate;
    }

    this.props.loadrepetitionsview(this.props.repetition.id, newPayload);
  }

  handleShowEndDateCheckbox = () => {
    // const endDate = moment(this.state.startDate).add('1', 'M')
    this.setState({
      showEndDate: !this.state.showEndDate,
      endDate: this.state.startDate,
    }, () => this.handlePayload());
  }

  handleRadioInput = value => this.setState({ option: value }, () => this.handlePayload());

  render() {
    return (
      <div>
        <Row>
          <Col xs={4} md={4}>
            <FormGroup className={styles.repetition__datepicker_row} controlId="formControlsSelect">
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
            <FormGroup className={styles.repetition__datepicker_row} controlId="formControlsSelect">
              <ControlLabel>Start date</ControlLabel>
              <DomaDatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDate}
                type="none"
              />
            </FormGroup>
          </Col>
          <Col xs={4} md={4}>
            <div className={!this.state.showEndDate ? `${styles.repetition__showEndDate_checkbox}` : ''}>
              <input
                name="EveryDayShowEndDate"
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
        <HolidaysRadioGroup
          handleradioinput={this.handleRadioInput}
          id={this.props.repetition.id}
          option={this.state.option}
        />
      </div>
    );
  }
}

EveryDay.propTypes = {
  repetition: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  loadrepetitionsview: PropTypes.func,
  formvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  handlechange: PropTypes.func,
};
