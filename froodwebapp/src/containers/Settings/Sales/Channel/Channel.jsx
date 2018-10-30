/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import {
  Controls,
  FormSelect,
  FormInput
} from 'components';
import { getMenuItems } from 'utils';
import {
  channelGetRequest,
  channelUpdateRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';

const mapStateToProps = state => ({
  loadingPage: state.channel.loadingPage,
  initialValues: state.channel.data,
  priceLists: state.channel.priceLists,
  payterms: state.commonData.payterms
});

const mapDispatchToProps = {
  channelGetRequest,
  channelUpdateRequest
};

const reduxFormConfig = {
  form: 'channelForm',
  enableReinitialize: true,
};

export class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.channelGetRequest({
      params: [{ id: this.state.channelId }]
    });
  }


  handleSave = (formData) => {
    this.props.channelUpdateRequest({
      payload: {
        id: this.state.channelId,
        isActive: formData.isActive,
        paymentTermId: formData.paymentTermId,
        priceListId: formData.priceListId
      }
    });
  }

  render() {
    const {
      payterms,
      priceLists,
      handleSubmit,
      loadingPage
    } = this.props;
    const { channelId } = this.state;

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          { channelId === '5' &&
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Store URL</label>
            </Col>
            <Col lg={ 3 }>
              <Field
                name="storeDomain"
                placeholder="https://xyz.myshopify.com"
                component={ FormInput }
              />
            </Col>
          </Row>
          }
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Price List</label>
            </Col>
            <Col lg={ 3 }>
              <Field
                name="priceListId"
                type="select"
                menuItems={ getMenuItems(priceLists) }
                component={ FormSelect }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Payment Terms</label>
            </Col>
            <Col lg={ 3 }>
              <Field
                name="paymentTermId"
                type="select"
                menuItems={ getMenuItems(payterms) }
                component={ FormSelect }
              />
            </Col>
          </Row>
          <Row center="xs">
            <Col lg={ 5 }>
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

Channel.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // data
  priceLists: PropTypes.array.isRequired,
  // static data
  payterms: PropTypes.array.isRequired,
  // router
  match: PropTypes.object.isRequired,
  // redux-base
  channelGetRequest: PropTypes.func.isRequired,
  channelUpdateRequest: PropTypes.func.isRequired,
  // redux-form
  handleSubmit: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Channel)));
