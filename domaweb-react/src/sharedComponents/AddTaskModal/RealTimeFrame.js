import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import
  ToastrContainer, {
  Toast,
  ToastDanger,
} from 'react-toastr-basic';
import messages from './messages';

import Icon from 'react-icons-kit';
import { spinner } from 'react-icons-kit/fa/spinner';

import { getformatedTimeDuration } from '../../utils/dateUtil';
import DomaDatePicker from '../DomaDatePicker/';
import DomaTimePicker from '../DomaTimePicker/';
import HeaderLabel from '../HeaderLabel';
import styles from './AddTaskModal-styles.scss';


const onSubmit = async values => {
};

// default variables
let currentStartTime = moment().format('HH:mm');
let currentEndTime = moment().add('hours', 1).format('HH:mm');


class RealTimeFrame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(`${this.props.startDate}${'T'}${currentStartTime}`).format('YYYY-MM-DDTHH:mm'),
      endDate: moment(`${this.props.endDate}${'T'}${currentEndTime}`).format('YYYY-MM-DDTHH:mm'),
    };

    this.timeFormatHandler = this.timeFormatHandler.bind(this);
    this.dateFormatHandler = this.dateFormatHandler.bind(this);
  }


  // get start, end TIME and format plannedStartTime and plannedEndTime
  timeFormatHandler = (value, { ...props }) => {
    const { name } = { ...props.input };
    if (name === 'startTime') {
      const defaultStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
      const mergedStartDateTime = `${defaultStartDate}${'T'}${value}`;
      this.setState({ startDate: mergedStartDateTime });

      const payload = {
        plannedStartTime: mergedStartDateTime,
        plannedEndTime: this.state.endDate
      };

      this.props.dateHandler(payload);
    }
    else if (name === 'endTime') {
      const defaultEndDate = moment(this.state.endDate).format('YYYY-MM-DD');
      const mergedEndDateTime = `${defaultEndDate}${'T'}${value}`;
      this.setState({ endDate: mergedEndDateTime });
      const payload = {
        plannedStartTime: this.state.startDate,
        plannedEndTime: mergedEndDateTime,
      };

      this.props.dateHandler(payload);
    }
  }

  // get start, end DATE and format plannedStartTime and plannedEndTime
  dateFormatHandler = (value, { ...props }) => {
    const { name } = { ...props.input };
    if (name === 'plannedStartTime') {
      const defaultStartDate = moment(this.state.startDate).format('HH:mm');
      const mergedStartDateTime = `${value}${'T'}${defaultStartDate}`;
      this.setState({startDate: mergedStartDateTime});

      const payload = {
        plannedStartTime: mergedStartDateTime,
        plannedEndTime: this.state.endDate,
      };
      this.props.dateHandler(payload);
    }
    else if (name === 'plannedEndTime') {
      const defaultEndDate = moment(this.state.endDate).format('HH:mm');
      const mergedEndDateTime = `${value}${'T'}${defaultEndDate}`;
      this.setState({ endDate: mergedEndDateTime });

      const payload = {
        plannedStartTime: this.state.startDate,
        plannedEndTime: mergedEndDateTime,
      };

      this.props.dateHandler(payload);
    }
  }


  render() {

    // DatePiсker wrapper for the DomaDatePicker sharedComponent
    const dateInput = props => (
      <DomaDatePicker
        defaultValue={moment(props.input.value)}
        {...props}
        onChange={(value) => {
          this.dateFormatHandler(value, { ...props });
        }}
        minDate={moment()}
      />
    );

    // TimePiсker wrapper for the DomaTimePicker sharedComponent
    const timeInput = props => (
      <DomaTimePicker
        defaultValue={moment(props.input.value)}
        minuteStep={5}
        showTimeSelect
        minuteStep={5}
        disabled={props.disabled}
        {...props}
        onChange={(value) => {
          this.timeFormatHandler(value, { ...props });
        }}
        format={'HH:mm'}
      />
    );


    return (
      <div>
        <Form
          initialValues={{
            plannedStartTime: this.state.startDate,
            plannedEndTime: this.state.endDate,
          }}
          onSubmit={onSubmit}
          validate={ values => { // validate customer and tasktype fields
            const errors = {};

            if (Date.parse(this.state.startDate) >= Date.parse(this.state.endDate)) {
              errors.plannedEndTime = <FormattedMessage {...messages.dateMandatory} />;
            }
            return errors;
          }}
          render={({
            handleSubmit,
            values,
            errors,
          }) => (
            <div>
              <Row>
                <FormattedMessage {...messages.realtimeframe}>
                  {realtimeframe => (
                    <HeaderLabel headercolor='#02adf5' labeltext={realtimeframe} />
                  )}
                </FormattedMessage>
                <div>
                  <div className={styles.section_box_left}>
                    <div className={styles.date_section}>
                      <div className={styles.date_section_heading}>
                        <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                          {<FormattedMessage {...messages.startDate} />}
                        </span>
                      </div>
                    <div className={styles.date_section_datetime}>
                      <div className={styles.date_section_date}>
                        <Field
                          render={dateInput}
                          startDate={this.state.startDate}
                          defaultValue={this.state.startDate}
                          name="plannedStartTime"
                          formData={values}
                        />
                      </div>
                      <div className={styles.date_section_time}>
                        <Field
                          render={timeInput}
                          defaultValue={moment(this.state.startDate)}
                          showSecond={false}
                          name="startTime"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.date_section}>
                    <div className={styles.date_section_heading}>
                      <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                        {<FormattedMessage {...messages.endDate} />}
                      </span>
                    </div>
                    <div className={styles.date_section_datetime}>
                      <div className={styles.date_section_date}>
                        <Field
                            render={dateInput}
                            startDate={this.state.endDate}
                            defaultValue={this.state.endDate}
                            name="plannedEndTime"
                        />
                      </div>
                      <div className={styles.date_section_time}>
                        <Field
                          render={timeInput}
                          defaultValue={moment(this.state.endDate)}
                          showSecond={false}
                          name="endTime"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.duration_section}>
                    <div className={styles.duration_section_heading}>
                      <span style={{ fontWeight: 'bold' }}>
                        {<FormattedMessage {...messages.duration} />}
                      </span>
                    </div>
                  <div className={styles.duration_section_time}>
                    {getformatedTimeDuration(this.state.startDate, this.state.endDate)}
                  </div>
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={styles.error}>
                {Date.parse(this.state.startDate) >= Date.parse(this.state.endDate)
                  ?
                    <FormattedMessage {...messages.dateMandatory}/>
                  :
                    null
                }
              </div>
            </Col>
          </Row>
        </div>)
      } />
      </div>
    );
  }
}


RealTimeFrame.propTypes = {
  dateHandler: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default RealTimeFrame;
