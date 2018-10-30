import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormRadioGroup, FormInputNumber, FormCheckbox } from 'components';
import styles from '../Promotion.scss';

const RedemptionCard = ({ isLimited }) => (
  <Col>
    <Card className={ styles.card }>
      <Row start="xs" bottom="xs">
        <Col
          xs={ 4 }
          sm={ 2 }
          md={ 3 }
          lg={ 3 }
          className={ styles.radioGroup }
        >
          <Field
            name="isLimited"
            type="checkbox"
            component={ FormRadioGroup }
            radioButtonValues={ [{
              value: false,
              text: 'Unlimited'
            }, {
              value: true,
              text: 'Limited Use',
            }] }
          />
        </Col>
        <Col xs={ 3 } sm={ 1 } md={ 2 } lg={ 2 }>
          <Field
            name="qualifyingOrder"
            placeholder="Number"
            component={ FormInputNumber }
            disabled={ !isLimited }
          />
        </Col>
      </Row>
      <Row start="xs">
        <Col xs md lg className={ styles.floatLeft }>
          <Field
            name="forSingleTime"
            text="Single Time Use Per Customer"
            component={ FormCheckbox }
          />
        </Col>
      </Row>
      <Row start="xs">
        <Col xs md lg className={ styles.floatLeft }>
          <Field
            name="forFirstPurchase"
            text="First Time Use Only"
            component={ FormCheckbox }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);

RedemptionCard.propTypes = {
  isLimited: PropTypes.bool,
};

export default RedemptionCard;
