/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  FormInput,
  FormTextArea,
  FormSelect,
  Controls,
  PageHeader,
  FormRadioButtonGroup,
} from 'components';
import {
  priceListSaveRequest,
  priceListUpdateRequest,
} from 'redux-base/actions';
import { reduxForm, Field } from 'redux-form';
import { getMenuItems } from 'utils';
import { form, radioGroup } from 'styles/common.scss';

const reduxFormConfig = {
  form: 'priceListForm',
  enableReinitialize: true,
};

const mapStateToProps = state => ({
  loadingPage: state.priceList.loadingPage,
  initialValues: {
    ...state.priceList.data,
    currencyId: (state.priceList.data.currency
              && state.priceList.data.currency.id)
              || state.login.user.currencyId
  },
  currencies: state.commonData.currencies
});

const mapDispatchToProps = {
  priceListSaveRequest,
  priceListUpdateRequest,
  push
};

const listTypeRadioButtonValues = [{
  value: 1,
  text: 'BUY',
}, {
  value: 2,
  text: 'SELL',
}];

const priceTypeRadioButtonValues = [{
  value: true,
  text: 'TAX INCLUSIVE',
}, {
  value: false,
  text: 'TAX EXCLUSIVE',
}];

export class PriceListForm extends Component {
  componentWillReceiveProps(nextProps) {
    // when we create price list redirect to edit page
    if (nextProps.initialValues.id && nextProps.isNewPriceList) {
      this.props.push(`/settings/system/price-lists/${nextProps.initialValues.id}/${nextProps.initialValues.code}`);
    }
  }

  handleSave = (formData) => {
    if (this.props.isNewPriceList) {
      this.props.priceListSaveRequest({
        payload: {
          code: formData.code,
          currencyId: formData.currencyId,
          description: formData.description,
          name: formData.name,
          type: formData.type,
          isTaxIncl: formData.isTaxIncl
        }
      });
    } else {
      this.props.priceListUpdateRequest({
        payload: {
          description: formData.description,
          name: formData.name,
          isTaxIncl: formData.isTaxIncl,
          id: formData.id,
        }
      });
    }
  }

  render() {

    const {
      handleSubmit,
      isNewPriceList,
      currencies
    } = this.props;

    return (
      <div>
        <PageHeader
          bigText="Price Lists"
          smallText="A price list is non-standard set of prices that can be attached to channels (Sell Type) or vendors (Buy Type)."
        />
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row center="xs">
            <Col xs={ 12 } lg={ 4 }>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Price List Name</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="name"
                    placeholder="Price List Name"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Price List Code</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="code"
                    placeholder="Price List Code"
                    disabled={ !isNewPriceList }
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Currency</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="currencyId"
                    disabled={ !isNewPriceList }
                    type="text"
                    menuItems={ getMenuItems(currencies) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>List Type</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="type"
                    disabled={ !isNewPriceList }
                    className={ radioGroup }
                    radioButtonValues={ listTypeRadioButtonValues }
                    component={ FormRadioButtonGroup }
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={ 12 } lg={ 4 }>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Description</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="description"
                    placeholder="Description"
                    component={ FormTextArea }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Price Type</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="isTaxIncl"
                    className={ radioGroup }
                    type="checkbox"
                    radioButtonValues={ priceTypeRadioButtonValues }
                    component={ FormRadioButtonGroup }
                  />
                </Col>
              </Row>
              <Row end="xs">
                <Col xs>
                  <Controls
                    submitButtonVisible
                    cancel={ false }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

PriceListForm.propTypes = {
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // props
  isNewPriceList: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  // static data
  currencies: PropTypes.array.isRequired,
  // redux-base
  priceListUpdateRequest: PropTypes.func.isRequired,
  priceListSaveRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(PriceListForm));
