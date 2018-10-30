import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGridTable,
  FormRadioButtonGroup,
  Controls
} from 'components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form';
import {
  orderSaveRequest,
  orderUpdateRequest
} from 'redux-base/actions';
import ConnectedTotalAndNotes from './TotalAndNotes/TotalAndNotes';
import {
  columns,
  prepareOrder,
  getButtonsByStatus
} from './orderTabHelpers';

const mapStateToProps = state => ({
  status: state.order.initialValues.status,
  initialSkuDetails: state.order.initialValues.skuDetails
});

const mapDispatchToProps = {
  orderSaveRequest,
  orderUpdateRequest
};

const radioButtonValues = [{
  value: false,
  text: 'Single'
}, {
  value: true,
  text: 'Recurring',
}];

export class OrderTab extends Component {
  handleSaveOrder = (formValues, operation) => {
    this.props.orderSaveRequest({
      payload: prepareOrder(formValues, operation)
    });
  }

  handleUpdateOrder = (formValues, operation) => {
    // mark deleted skuDetails
    const skuDetails = [];
    this.props.initialSkuDetails.forEach((skuDetail) => {
      const exist = formValues.skuDetails.some(sd => sd.id === skuDetail.id);
      if (!exist) {
        skuDetails.push({
          ...skuDetail,
          deleted: true
        });
      }
    });

    // delete id for new skuDetails
    formValues.skuDetails.forEach((sd) => {
      skuDetails.push({
        ...sd,
        id: sd.new ? null : sd.id
      });
    });

    this.props.orderUpdateRequest({
      payload: prepareOrder({ ...formValues, skuDetails }, operation)
    });
  }

  render() {
    const {
      // props
      status,
      disabled,
      isNewOrder,
      // redux-form
      handleSubmit,
      onFieldChange
    } = this.props;

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
        <Row>
          <Col xs sm md={ 5 } lg={ 3 }>
            <Field
              name="isRecurring"
              radioButtonValues={ radioButtonValues }
              type="checkbox"
              disabled={ !isNewOrder }
              component={ FormRadioButtonGroup }
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm md lg>
            <Field
              name="skuDetails"
              addNewRowVisible={ !disabled }
              columns={ columns(disabled) }
              component={ FormGridTable }
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm md lg>
            <ConnectedTotalAndNotes
              currency="$"
              disabled={ disabled }
              onFieldChange={ onFieldChange }
            />
          </Col>
        </Row>
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
      </div>
    );
  }
}

OrderTab.propTypes = {
  // data
  status: PropTypes.string,
  initialSkuDetails: PropTypes.array,
  // state
  disabled: PropTypes.bool,
  isNewOrder: PropTypes.bool,
  // redux-base
  orderSaveRequest: PropTypes.func.isRequired,
  orderUpdateRequest: PropTypes.func.isRequired,
  // redux-form
  onFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);
