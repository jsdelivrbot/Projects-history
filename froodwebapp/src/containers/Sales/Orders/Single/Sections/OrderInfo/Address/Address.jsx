import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  customerAddressGetRequest
} from 'redux-base/actions';
import { push } from 'react-router-redux';
import { Field, formValueSelector } from 'redux-form';
import { FormAddressInfo, FormAddressPopup } from 'components';

const selector = formValueSelector('newOrderForm');

const mapStateToProps = state => ({
  customerAddresses: state.order.customerAddresses,
  customer: selector(state, 'customer')
});

const mapDispatchToProps = {
  customerAddressGetRequest,
  push
};

export class Address extends Component {
  componentWillReceiveProps(nextProps) {
    // when we choose customer, search for his locations
    if (!nextProps.disabled
     && nextProps.customer.id
     && nextProps.customer.id !== this.props.customer.id) {
      this.props.customerAddressGetRequest({
        id: nextProps.customer.id
      });
    }
  }

  handleCustomerAddressRedirect = (address) => {
    const { customer } = this.props;

    const pathname = `/sales/customers/${customer.id}/${customer.name}`;

    const state = {
      activeTab: 'addresses'
    };

    if (address) {
      state.activeAddressId = address.id;
    } else {
      state.activeAddressId = 'new';
    }

    this.props.push({
      pathname,
      state
    });
  }

  render() {
    const {
      customerAddresses,
      customer,
      disabled
    } = this.props;

    return (
      <Row>
        <Col lg={ 4 }>
          <Field
            name="billingAddress"
            title="Ship To:"
            disabled={ disabled || !customer.id }
            allAddresses={ customerAddresses }
            handleAddressRedirect={ this.handleCustomerAddressRedirect }
            component={ FormAddressPopup }
          />
          { customer.id &&
            <Field
              name="billingAddress"
              component={ FormAddressInfo }
            />
          }
        </Col>
        <Col lg={ 4 }>
          <Field
            name="shippingAddress"
            title="Bill To:"
            disabled={ disabled || !customer.id }
            allAddresses={ customerAddresses }
            handleAddressRedirect={ this.handleCustomerAddressRedirect }
            component={ FormAddressPopup }
          />
          { customer.id &&
            <Field
              name="shippingAddress"
              component={ FormAddressInfo }
            />
          }
        </Col>
      </Row>
    );
  }
}


Address.propTypes = {
  // state
  disabled: PropTypes.bool,
  // static
  customerAddresses: PropTypes.array,
  // props
  customer: PropTypes.object,
  // router
  push: PropTypes.func.isRequired,
  // redux-base
  customerAddressGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
