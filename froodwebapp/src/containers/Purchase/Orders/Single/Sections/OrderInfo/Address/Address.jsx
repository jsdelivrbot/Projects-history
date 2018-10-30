import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  supplierPurchaseGetRequest
} from 'redux-base/actions';
import { push } from 'react-router-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import { FormAddressInfo, FormAddressPopup } from 'components';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  vendorLocations: state.purchaseOrder.vendorLocations,
  companyLocations: state.purchaseOrder.companyLocations,
  vendor: selector(state, 'vendor')
});

const mapDispatchToProps = {
  supplierPurchaseGetRequest,
  push
};

export class Address extends Component {
  componentWillReceiveProps(nextProps) {
    // when we choose vendor, search for his locations
    if (nextProps.vendor.id
    && !nextProps.disabled
    && nextProps.vendor.id !== this.props.vendor.id) {
      this.props.supplierPurchaseGetRequest({
        id: nextProps.vendor.id
      });
    }
  }

  handleSupplierAddressRedirect = (company) => {
    const pathname = `/purchase/suppliers/${this.props.vendor.id}/${this.props.vendor.name}`;

    const state = {
      activeTab: 'locations'
    };

    if (company) {
      state.activeAddressId = company.address.id;
    } else {
      state.activeAddressId = 'new';
    }

    this.props.push({
      pathname,
      state
    });
  }

  handleRedirectToShippingAddress = (company) => {
    this.handleRedirectToLocation(company, 'shipping');
  }

  handleRedirectToBillingAddress = (company) => {
    this.handleRedirectToLocation(company, 'billing');
  }

  handleRedirectToLocation = (company, addressType) => {
    const pathname = '/settings/system/locations';

    const state = {
      activeTab: 'locations'
    };

    // if company address exists
    if (company) {
      state.activeAddress = {
        id: company.id
      };
    } else if (addressType === 'shipping') { // if new company address of type shipping
      state.activeAddress = {
        id: 'new',
        warehouse: true
      };
    } else if (addressType === 'billing') { // if new company address of type billing
      state.activeAddress = {
        id: 'new'
      };
    }

    this.props.push({
      pathname,
      state
    });
  }

  render() {
    const {
      vendorLocations,
      companyLocations,
      vendor,
      disabled
    } = this.props;

    const shippingLocations = companyLocations.filter(companyLocation => companyLocation.typeDescription === 'Warehouse');

    return (
      <Row>
        <Col xs sm md lg>
          <Row>
            <Col lg={ 4 }>
              <Field
                name="vendor"
                title="Purchase Order To:"
                disabled={ disabled || !vendor.id }
                allAddresses={ vendorLocations }
                handleAddressRedirect={ this.handleSupplierAddressRedirect }
                component={ FormAddressPopup }
              />
              { vendor.id &&
                <Field
                  name="vendor"
                  component={ FormAddressInfo }
                />
              }
            </Col>
            <Col lg={ 4 }>
              <Field
                name="shipToCompany"
                title="Ship To:"
                disabled={ disabled }
                allAddresses={ shippingLocations }
                handleAddressRedirect={ this.handleRedirectToShippingAddress }
                component={ FormAddressPopup }
              />
              <Field
                name="shipToCompany"
                component={ FormAddressInfo }
              />
            </Col>
            <Col lg={ 4 }>
              <Field
                name="billToCompany"
                title="Bill To:"
                disabled={ disabled }
                allAddresses={ companyLocations }
                handleAddressRedirect={ this.handleRedirectToBillingAddress }
                component={ FormAddressPopup }
              />
              <Field
                name="billToCompany"
                component={ FormAddressInfo }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}


Address.propTypes = {
  vendorLocations: PropTypes.array,
  companyLocations: PropTypes.array,
  disabled: PropTypes.bool,
  vendor: PropTypes.object,
  // router
  push: PropTypes.func.isRequired,
  // redux-base
  supplierPurchaseGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
