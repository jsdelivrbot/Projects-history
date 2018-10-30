/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Spin } from 'antd';
import { customerSaveRequest } from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import {
  FormInput,
  FormRadioButtonGroup,
  FormTelephoneInput,
  PageHeader,
  Controls
} from 'components';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { form } from 'styles/common.scss';

const mapStateToProps = state => ({
  loadingPage: state.customer.loadingPage,
  customer: state.customer.data
});

const mapDispatchToProps = {
  customerSaveRequest,
  push
};

const reduxFormConfig = {
  form: 'customersNewPageForm',
  initialValues: {
    type: '0'
  }
  // validate: CustomersNewFormValidation
};

const radioButtonValues = [{
  value: '0',
  text: 'B2C',
}, {
  value: '1',
  text: 'B2B',
}];


export class Customer extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      customer,
      location
    } = nextProps;

    if (customer && customer.id) {
      if (location.state && location.state.goBackRedirect) {
        this.props.push(location.state.goBackUrl);
      } else {
        this.props.push(`/sales/customers/${customer.id}/${customer.firstName}`);
      }
    }
  }

  handleSave = (values) => {
    const payload = {
      ...values,
      phone: values.phone.number,
      countryCode: values.phone.countryCode,
    };
    this.props.customerSaveRequest({
      payload
    });
  }

  render() {

    const {
      handleSubmit,
      loadingPage
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <PageHeader
          bigText="Customer Details"
          smallText="Enter your customer details, name, type to setup your relationship"
        />
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Customer type
                </strong>
              </label>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Field
                name="type"
                radioButtonValues={ radioButtonValues }
                component={ FormRadioButtonGroup }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  First name
                </strong>
              </label>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Field
                name="firstName"
                placeholder="first name"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 2 }>
              <label>
                <strong>Last name</strong>
              </label>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Field
                name="lastName"
                placeholder="last name"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Email address
                </strong>
              </label>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Field
                name="email"
                type="email"
                placeholder="someone@xyz.com"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Contact number
                </strong>
              </label>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Field
                name="phone"
                component={ FormTelephoneInput }
                defaultCountry="sg"
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs md={ 6 } lg={ 6 }>
              <Controls
                submitButtonText="Create"
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

Customer.propTypes = {
  customer: PropTypes.object,
  customerSaveRequest: PropTypes.func.isRequired,
  loadingPage: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // redux-router
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Customer)));
