import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Card, Spin } from 'antd';
import {
  FormDatePicker,
  FormInput,
  FormInputNumber,
  FormCheckbox,
  FormTelephoneInput,
  Controls
} from 'components';
import {
  customerProfileUpdateRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';
import { card } from './ProfileTab.scss';

const mapStateToProps = state => ({
  initialValues: state.customerProfile.data,
  loadingPage: state.customerProfile.loadingPage
});

const mapDispatchToProps = {
  customerProfileUpdateRequest
};

const reduxFormConfig = {
  form: 'customerProfileForm',
  enableReinitialize: true
  // validate: CustomerProfileFormValidation
};

export class ProfileTab extends Component {
  handleUpdateCustomerProfile = (values) => {
    const payload = {
      ...values,
      phone: values.phone.number,
      countryCode: values.phone.countryCode
    };
    this.props.customerProfileUpdateRequest({
      payload
    });
  }


  render() {
    const {
      loadingPage,
      handleSubmit
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleUpdateCustomerProfile) }
        >
          <Row>
            <Col xs md={ 4 } mdOffset={ 2 } lgOffset={ 2 } lg={ 4 }>
              <Card title="Details" className={ card }>
                <Row>
                  <Col xs>
                    First Name
                    <Field
                      name="firstName"
                      component={ FormInput }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs>
                    Last Name
                    <Field
                      name="lastName"
                      component={ FormInput }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs>
                    Email
                    <Field
                      name="email"
                      component={ FormInput }
                    />
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs>
                    Phone
                    <Field
                      name="phone"
                      component={ FormTelephoneInput }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs md={ 4 } lg={ 4 }>
              <Card title="Personal" className={ card }>
                <Row middle="xs" end="xs">
                  <Col xs>
                    Date Of Birth
                  </Col>
                  <Col xs>
                    <Field
                      name="dob"
                      component={ FormDatePicker }
                    />
                  </Col>
                </Row>
                <Row middle="xs" center="xs">
                  <Col xs={ 6 } />
                  <Col xs={ 3 }>
                    <span>Adults</span>
                  </Col>
                  <Col xs={ 3 }>
                    <span>Children</span>
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs={ 6 }>
                    <span>No Of People In Household</span>
                  </Col>
                  <Col xs={ 3 }>
                    <Field
                      name="adults"
                      min={ 0 }
                      component={ FormInputNumber }
                    />
                  </Col>
                  <Col xs={ 3 }>
                    <Field
                      name="children"
                      min={ 0 }
                      component={ FormInputNumber }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs md={ 4 } mdOffset={ 2 } lgOffset={ 2 } lg={ 4 }>
              <Card title="Marketing" className={ card }>
                <Row middle="xs">
                  <Col xs>
                    <Field
                      name="newsLetterSubscription"
                      text="Newsletter Subscription"
                      component={ FormCheckbox }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs md={ 4 } lg={ 4 } >
              <Card title="Delivery" className={ card }>
                <Row middle="xs">
                  <Col xs={ 6 } md={ 5 } lg={ 5 }>
                    Delivery Preferences
                  </Col>
                  <Col xs={ 6 }>
                    <Field
                      name="deliveryPreferences"
                      min={ 0 }
                      component={ FormInputNumber }
                    />
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs>
                    <Field
                      name="weekendDelivery"
                      text="Weekend Delivery"
                      component={ FormCheckbox }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={ 8 }>
              <Controls
                submitButtonVisible
                submitButtonText="Save"
                cancelButtonVisible={ false }
              />
            </Col>
          </Row>
        </form>
      </Spin>
    );
  }
}

ProfileTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // redux-base
  customerProfileUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(ProfileTab));
