import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormDatePicker,
  FormSelect,
  ColouredStatus
} from 'components';
import { Field } from 'redux-form';
import { getMenuItems } from 'utils';

const OrderCommonData = ({
  // status
  status,
  statusColor,

  // select data
  shippingMethods,
  payterms,
  vendorPaymentTermExist,
  contactUsers,

  // form data

  // state
  isNewOrder,
  disabled
}) => (
  <Col xs md={ 6 } lg={ 5 }>
    <Row middle="xs">
      <Col xs sm md lg>
        <ColouredStatus
          color={ statusColor }
          status={ status }
        />
      </Col>
    </Row>
    { !isNewOrder &&
      <Row middle="xs" end="xs">
        <Col>
          <strong>Purchase Order Date</strong>
        </Col>
        <Col xs md={ 8 } lg={ 4 }>
          <Field
            name="date"
            component={ FormDatePicker }
            disabled
          />
        </Col>
      </Row>
    }
    <Row middle="xs" end="xs">
      <Col>
        <strong>
          Required By
        </strong>
      </Col>
      <Col xs md={ 8 } lg={ 4 }>
        <Field
          name="deliveryDate"
          component={ FormDatePicker }
          disabled={ disabled }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs">
      <Col>
        <strong>Shipping Method</strong>
      </Col>
      <Col xs md={ 8 } lg={ 6 }>
        <Field
          name="deliveryMethod.id"
          component={ FormSelect }
          menuItems={ getMenuItems(shippingMethods) }
          disabled={ disabled }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs">
      <Col>
        <strong>Payment Term</strong>
      </Col>
      <Col xs md={ 8 } lg={ 6 }>
        <Field
          name="paymentTerms.id"
          component={ FormSelect }
          menuItems={ getMenuItems(payterms) }
          disabled={ vendorPaymentTermExist }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs">
      <Col>
        <strong>Contact User</strong>
      </Col>
      <Col xs md={ 8 } lg={ 6 }>
        <Field
          name="contactUser.id"
          component={ FormSelect }
          menuItems={ getMenuItems(contactUsers) }
          disabled={ disabled }
        />
      </Col>
    </Row>
  </Col>
);

OrderCommonData.propTypes = {
  // common data
  shippingMethods: PropTypes.array,
  payterms: PropTypes.array,
  vendorPaymentTermExist: PropTypes.bool.isRequired,
  contactUsers: PropTypes.array,
  // props
  status: PropTypes.string,
  isNewOrder: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  statusColor: PropTypes.string
};

export default OrderCommonData;
