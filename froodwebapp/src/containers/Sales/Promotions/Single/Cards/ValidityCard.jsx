import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormDatePicker, FormTimePicker, FormCheckbox } from 'components';
import styles from '../Promotion.scss';

const ValidityCard = ({
  requireEndDate,
  setNoEndDate
}) => (
  <Col>
    <Card className={ styles.card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 2 } lg={ 2 }>Start Date</Col>
        <Col xs={ 12 } md={ 4 } lg={ 4 }>
          <Field
            name="startDate"
            component={ FormDatePicker }
          />
        </Col>
        <Col xs={ 12 } md={ 2 } lg={ 2 }>
          <Field
            name="startTime"
            timeFormat="HH:mm"
            component={ FormTimePicker }
          />
        </Col>
      </Row>
      <Row middle="xs" className={ styles.floatLeft }>
        <Col xs md lg>
          {/* <Checkbox onChange={ setNoEndDate }>Required End Date</Checkbox> */}
          <Field
            name="requireEndDate"
            text="Required End Date"
            onChange={ setNoEndDate }
            component={ FormCheckbox }
          />
        </Col>
      </Row>
      { requireEndDate &&
        <Row middle="xs">
          <Col xs={ 12 } md={ 2 } lg={ 2 }>End Date</Col>
          <Col xs={ 12 } md={ 4 } lg={ 4 }>
            <Field
              name="endDate"
              component={ FormDatePicker }
            />
          </Col>
          <Col xs={ 12 } md={ 2 } lg={ 2 }>
            <Field
              name="endTime"
              timeFormat="HH:mm"
              component={ FormTimePicker }
            />
          </Col>
        </Row>
      }
    </Card>
  </Col>
);

ValidityCard.propTypes = {
  requireEndDate: PropTypes.bool.isRequired,
  setNoEndDate: PropTypes.func.isRequired,
};

export default ValidityCard;
