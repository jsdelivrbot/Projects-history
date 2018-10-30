/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  FormInput,
  FormTextArea,
  FormSelect,
  Controls
} from 'components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import { Spin } from 'antd';
import {
  supplierSaveRequest,
  supplierUpdateRequest
} from 'redux-base/actions';
import { getMenuItems } from 'utils';
import { form } from 'styles/common.scss';

const topFormSelector = formValueSelector('supplierMainTab');

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  countries: state.commonData.countries,
  payterms: state.commonData.payterms,
  countryId: topFormSelector(state, 'country.id'),
  initialValues: {
    ...state.supplier.data,
    currency: {
      id: state.supplier.data.currency.id ||
      state.commonData.currencies.find(currency => currency.countryId === state.login.user.countryId).id
    },
    country: {
      id: state.supplier.data.country.id ||
      state.commonData.countries.find(country => country.id === state.login.user.countryId).id
    },
  }
});

const mapDispatchToProps = {
  supplierSaveRequest,
  supplierUpdateRequest,
  push
};

const reduxFormConfig = {
  form: 'supplierMainTab',
  enableReinitialize: true
};

export class MainTab extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isNewSupplier && nextProps.initialValues.id) {
      this.props.push(`/purchase/suppliers/${nextProps.initialValues.id}/${nextProps.initialValues.name}`);
    } else if (this.props.countryId !== nextProps.countryId) {
      this.props.change('currency.id', nextProps.countryId);
    }
  }

  handleSave = (formData) => {
    if (this.props.isNewSupplier) {
      this.props.supplierSaveRequest({
        payload: {
          countryId: formData.country.id,
          currencyId: formData.currency.id,
          description: formData.description,
          name: formData.name,
          website: formData.website
        }
      });
    } else {
      this.props.supplierUpdateRequest({
        payload: {
          countryId: formData.country.id,
          currencyId: formData.currency.id,
          description: formData.description,
          id: this.props.supplierId,
          paymentTerms: formData.paymentTerms.id,
          tin: formData.tin,
          website: formData.website
        }
      });
    }
  }

  render() {
    const {
      loadingPage,
      handleSubmit,
      countries,
      payterms,
      isNewSupplier
    } = this.props;

    const currenciesMenuItems = countries.map(country => ({ key: country.id, value: country.currency }));

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          { isNewSupplier &&
            <Row middle="xs" center="xs">
              <Col xs={ 3 } sm={ 2 }>
                <label>Company Name</label>
              </Col>
              <Col xs={ 7 } sm={ 4 }>
                <Field
                  name="name"
                  placeholder="Enter name of a company"
                  component={ FormInput }
                />
              </Col>
            </Row>
          }
          <Row middle="xs" center="xs">
            <Col xs={ 3 } sm={ 2 }>
              <label>Description</label>
            </Col>
            <Col xs={ 7 } sm={ 4 }>
              <Field
                name="description"
                placeholder="Description"
                component={ FormTextArea }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 3 } sm={ 2 }>
              <label>Country</label>
            </Col>
            <Col xs={ 7 } sm={ 4 }>
              <Field
                name="country.id"
                menuItems={ getMenuItems(countries) }
                component={ FormSelect }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 3 } sm={ 2 }>
              <label>Dealing Currency</label>
            </Col>
            <Col xs={ 7 } sm={ 4 }>
              <Field
                name="currency.id"
                menuItems={ currenciesMenuItems }
                component={ FormSelect }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 3 } sm={ 2 }>
              <label>Website</label>
            </Col>
            <Col xs={ 7 } sm={ 4 }>
              <Field
                name="website"
                placeholder="abc.com (Optional)"
                component={ FormInput }
              />
            </Col>
          </Row>
          { !isNewSupplier &&
            <Row middle="xs" center="xs">
              <Col xs={ 3 } sm={ 2 }>
                <label>Payment Terms</label>
              </Col>
              <Col xs={ 7 } sm={ 4 }>
                <Field
                  name="paymentTerms.id"
                  menuItems={ getMenuItems(payterms) }
                  component={ FormSelect }
                />
              </Col>
            </Row>
          }
          { !isNewSupplier &&
            <Row middle="xs" center="xs">
              <Col xs={ 3 } sm={ 2 }>
                <label>Tax Identification Number</label>
              </Col>
              <Col xs={ 7 } sm={ 4 }>
                <Field
                  name="tin"
                  placeholder="Any text"
                  component={ FormInput }
                />
              </Col>
            </Row>
          }
          <Row center="xs">
            <Col xs={ 10 } sm={ 6 }>
              <Controls
                submitButtonVisible
                cancelButtonVisible={ false }
              />
            </Col>
          </Row>
        </form>
      </Spin>
    );
  }
}

MainTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  countries: PropTypes.array.isRequired,
  payterms: PropTypes.array.isRequired,
  supplierId: PropTypes.string.isRequired,
  isNewSupplier: PropTypes.bool.isRequired,
  countryId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  // router
  push: PropTypes.func.isRequired,
  // redux-base
  supplierSaveRequest: PropTypes.func.isRequired,
  supplierUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(MainTab));
