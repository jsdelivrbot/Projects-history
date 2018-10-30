import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormInput } from 'components';
import styles from '../Promotion.scss';

const InfoCard = ({
  isNewPromotion
}) => (
  <Col className={ styles.cardWrapper }>
    <Card className={ styles.card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Code</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="code"
            placeholder="Code"
            disabled={ !isNewPromotion }
            component={ FormInput }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Title</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="title"
            placeholder="Title"
            component={ FormInput }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Description</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="desc"
            placeholder="Description"
            component={ FormInput }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);

InfoCard.propTypes = {
  isNewPromotion: PropTypes.bool.isRequired,
};

export default InfoCard;
