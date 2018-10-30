import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormSelect, FormInput } from 'components';
import { getMenuItems } from 'utils';
import styles from '../Promotion.scss';

const mapStateToProps = state => ({
  selectValues: state.commonData.promotionFields
});

const OrderTypesCard = ({
  selectValues
}) => (
  <Col className={ styles.cardWrapper }>
    <Card className={ styles.card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Apply to Order Type</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="orderType"
            component={ FormSelect }
            props={ {
              menuItems: getMenuItems(selectValues.orderType)
            } }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Qualifier</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="domains"
            placeholder="Qualifier"
            component={ FormInput }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);


OrderTypesCard.propTypes = {
  selectValues: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(OrderTypesCard);
