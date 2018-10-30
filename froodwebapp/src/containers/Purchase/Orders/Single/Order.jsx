import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import {
  purchaseOrderGetRequest,
  purchaseOrderFieldsGetRequest,
} from 'redux-base/actions';
import { form } from 'styles/common.scss';
import { Tabs, ConnectedOrderInfo } from './Sections';
import editableStatuses from './orderHelpers';

const mapStateToProps = state => ({
  loadingPage: state.purchaseOrder.loadingPage,
  initialValues: state.purchaseOrder.initialValues,
  status: state.purchaseOrder.initialValues.status,
});

const mapDispatchToProps = {
  purchaseOrderGetRequest,
  purchaseOrderFieldsGetRequest,
  push
};

const reduxFormConfig = {
  form: 'newPurchaseOrderForm',
  enableReinitialize: true
};

export class Order extends Component {
  constructor(props) {
    super(props);
    const orderId = this.props.match.params.id;
    const isNewOrder = orderId === 'new';

    this.state = {
      orderId,
      isNewOrder
    };
  }

  componentWillMount() {
    if (this.state.isNewOrder) {
      this.props.purchaseOrderFieldsGetRequest();
    } else {
      this.props.purchaseOrderGetRequest({
        params: [{
          id: this.state.orderId
        }]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // redirect to all PO screen when create new one
    if ((nextProps.initialValues.id && this.state.isNewOrder) ||
    // when updating existing one to another status
    (nextProps.initialValues.id === this.props.initialValues.id && nextProps.status !== this.props.status)) {
      this.props.push('/purchase/orders');
    }

    const orderId = nextProps.match.params.id;
    const isNewOrder = orderId === 'new';

    this.setState({
      orderId,
      isNewOrder
    });
  }

  render() {
    const {
      isNewOrder,
      orderId
    } = this.state;

    const {
      // trigger
      loadingPage,
      // props
      status,
      // form
      handleSubmit
    } = this.props;

    // disable stuff, when status is not `Draft` or `Not Saved`
    const orderInfoDisabled = !editableStatuses.includes(status);

    return (
      <Spin spinning={ loadingPage }>
        <form className={ form }>
          <ConnectedOrderInfo
            status={ status }
            isNewOrder={ isNewOrder }
            disabled={ orderInfoDisabled }
          />
          <Tabs
            status={ status }
            orderId={ orderId }
            orderInfoDisabled={ orderInfoDisabled }
            handleSubmit={ handleSubmit }
          />
        </form>
      </Spin>
    );
  }
}

Order.propTypes = {
  loadingPage: PropTypes.bool.isRequired,
  // redux-base
  purchaseOrderGetRequest: PropTypes.func.isRequired,
  purchaseOrderFieldsGetRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  // form
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  // data
  status: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Order)));
