/* eslint-disable jsx-a11y/anchor-is-valid, css-modules/no-unused-class */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { FormCustomerAutoComplete } from 'components';
import { Field } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import ConnectedAddress from './Address/Address';
import ConnectedOrderCommonData from './OrderCommonData/OrderCommonData';

export const OrderInfo = ({
  onFieldChange,
  disabled,
  location: {
    pathname
  }
}) => (
  <Row>
    <Col xs md={ 6 } lg={ 7 }>
      <Row middle="xs">
        <Col xs md={ 8 } lg={ 6 }>
          <Field
            name="customer"
            disabled={ disabled }
            component={ FormCustomerAutoComplete }
          />
        </Col>
        { !disabled &&
          <Col xs md={ 8 } lg={ 4 }>
            <Link
              to={ {
                pathname: '/sales/customers/new',
                state: {
                  goBackRedirect: true,
                  goBackUrl: pathname
                }
              } }
            >
              Add New Customer
            </Link>
          </Col>
        }
      </Row>
      <Row>
        <Col lg>
          <ConnectedAddress disabled={ disabled } />
        </Col>
      </Row>
    </Col>
    <Col xs md={ 6 } lg={ 5 }>
      <ConnectedOrderCommonData
        onFieldChange={ onFieldChange }
        disabled={ disabled }
      />
    </Col>
  </Row>
);

OrderInfo.propTypes = {
  // redux-router
  location: PropTypes.object.isRequired,
  // redux-form
  onFieldChange: PropTypes.func.isRequired,
  // state
  disabled: PropTypes.bool.isRequired,
};

export default withRouter(OrderInfo);
