import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { form } from 'styles/common.scss';
import {
  ConnectedOrderInfo,
  Tabs
} from './Sections';
import {
  canBeEditedUntilPicked,
  canBeEditedUntilAllocated
} from './orderHelpers';

const mapStateToProps = state => ({
  loadingPage: state.order.loadingPage,
  initialValues: state.order.initialValues,
  status: state.order.initialValues.status,
});

const mapDispatchToProps = {
  push
};

const reduxFormConfig = {
  form: 'newOrderForm',
  enableReinitialize: true
};

export class Order extends Component {
  constructor(props) {
    super(props);
    const orderId = this.props.match.params.id;

    this.state = {
      orderId,
      isNewOrder: orderId === 'new',
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we save order to draft or confirmed make a redirect to all orders screen
    if (nextProps.initialValues.id && this.state.isNewOrder) {
      this.props.push('/sales/orders');
    }

    const orderId = nextProps.match.params.id;

    this.setState({
      orderId,
      isNewOrder: orderId === 'new'
    });
  }

  render() {
    const {
      orderId,
      isNewOrder
    } = this.state;

    const {
      // state
      status,
      // trigger
      loadingPage,
      // redux-form
      change,
      handleSubmit
    } = this.props;

    const orderInfoDisabled = !isNewOrder && !canBeEditedUntilPicked(status);
    const orderTabsDisabled = !isNewOrder && !canBeEditedUntilAllocated(status);

    return (
      <Spin spinning={ loadingPage }>
        <form className={ form }>
          <ConnectedOrderInfo
            onFieldChange={ change }
            disabled={ orderInfoDisabled }
          />
          <Tabs
            orderId={ orderId }
            isNewOrder={ isNewOrder }
            disabled={ orderTabsDisabled }
            onFieldChange={ change }
            handleSubmit={ handleSubmit }
          />
        </form>
      </Spin>
    );
  }
}

Order.propTypes = {
  loadingPage: PropTypes.bool.isRequired,
  // router
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  // form
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  // data
  status: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Order)));
