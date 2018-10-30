import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import {
  FormGridTable,
  Controls,
  ConnectedTopFormModal
} from 'components';
import {
  purchaseOrderSaveRequest,
  purchaseOrderUpdateRequest
} from 'redux-base/actions';
import ConnectedTotalAndNotes from './TotalAndNotes/TotalAndNotes';
import {
  columns,
  prepareOrder,
  prepareOrderForRelease,
  getButtonsByStatus,
} from './orderTabHelpers';
import fields from './modalFields';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  loadingPage: state.purchaseOrder.loadingPage,
  vendorId: selector(state, 'vendor.id'),
  initialValues: state.purchaseOrder.initialValues
});

const mapDispatchToProps = {
  purchaseOrderSaveRequest,
  purchaseOrderUpdateRequest
};

const releaseData = {
  email: '',
  subject: '',
  message: ''
};

export class OrderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: releaseData,
      modalVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // to close modal when order released
    if (nextProps.initialValues.id === this.props.initialValues.id &&
      nextProps.status !== this.props.status) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      });
    }
  }

  handleSaveOrder = (formValues, operation) => {
    this.props.purchaseOrderSaveRequest({
      payload: prepareOrder(formValues, operation)
    });
  }

  handleUpdateOrder = (formValues, operation) => {
    if (operation === 'release') {
      this.setState({
        modalVisible: true,
        modalData: {
          ...releaseData,
          ...formValues,
          email: this.props.initialValues.vendor.email
        }
      });
    } else {
      this.props.purchaseOrderUpdateRequest({
        payload: prepareOrder(formValues, operation)
      });
    }
  }

  handleReleaseOrder = (values) => {
    this.props.purchaseOrderUpdateRequest({
      payload: prepareOrderForRelease(values)
    });
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    const {
      loadingPage,
      status,
      vendorId,
      orderInfoDisabled,
      handleSubmit
    } = this.props;

    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      saveButtonVisible,
      saveButtonText,
      saveButtonHandler,
      updateButtonVisible,
      updateButtonText,
      updateButtonHandler,
      cancelButtonVisible,
      cancelButtonText,
      cancelButtonHandler
    } = getButtonsByStatus(
      status,
      this.handleSaveOrder,
      this.handleUpdateOrder
    );

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="Email Purchase Order"
          buttonVisible={ false }
          handleSave={ this.handleReleaseOrder }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Row>
          <Col xs>
            <Field
              name="details"
              addNewRowVisible={ !orderInfoDisabled }
              columns={ columns(orderInfoDisabled, vendorId) }
              component={ FormGridTable }
            />
            <ConnectedTotalAndNotes
              disabled={ orderInfoDisabled }
              currency="$"
            />
            <Controls
              saveButtonVisible={ saveButtonVisible }
              saveButtonText={ saveButtonText }
              onSaveButtonClick={ saveButtonHandler && handleSubmit(saveButtonHandler) }
              updateButtonVisible={ updateButtonVisible }
              updateButtonText={ updateButtonText }
              onUpdateButtonClick={ updateButtonHandler && handleSubmit(updateButtonHandler) }
              cancelButtonVisible={ cancelButtonVisible }
              cancelButtonText={ cancelButtonText }
              onCancelButtonClick={ cancelButtonHandler && handleSubmit(cancelButtonHandler) }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

OrderTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  vendorId: PropTypes.number,
  status: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  orderInfoDisabled: PropTypes.bool.isRequired,
  // form
  handleSubmit: PropTypes.func.isRequired,
  // redux-base
  purchaseOrderSaveRequest: PropTypes.func.isRequired,
  purchaseOrderUpdateRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);
