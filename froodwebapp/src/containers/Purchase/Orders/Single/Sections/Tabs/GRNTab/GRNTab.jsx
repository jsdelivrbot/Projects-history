import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import {
  FormGridTable,
  FormSelect,
  Controls,
  FormTextArea,
  ActionButton
} from 'components';
import {
  purchaseOrderGRNSaveRequest,
  purchaseOrderGRNUpdateRequest
} from 'redux-base/actions';
import {
  columns,
  prepareGRN,
  getButtonsByStatus
} from './GRNTabHelpers';
import { newGrnButton } from '../Tabs.scss';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  selectedGrnId: selector(state, 'selectedGrnId'),
  initialValues: state.purchaseOrder.initialValues,
  grnData: state.purchaseOrder.initialValues.grn,
  newGrn: state.purchaseOrder.initialValues.newGrn
});

const mapDispatchToProps = {
  purchaseOrderGRNSaveRequest,
  purchaseOrderGRNUpdateRequest
};

class GRNTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableFieldName: 'newGrn.list',
      noteFieldName: 'newGrn.internalNotes',
      selectFieldName: 'selectedGrnId',
      newButtonVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // when there is saved grn, it has `id` prop, so we check for it and show its data
    if (nextProps.newGrn.id) {
      this.setState({
        tableFieldName: 'newGrn.list',
        noteFieldName: 'newGrn.internalNotes'
      });
    } else if (nextProps.initialValues.status.toLowerCase() !== 'released') {
      if (nextProps.selectedGrnId &&
        nextProps.selectedGrnId !== this.props.selectedGrnId) {
        // when change select to show related table and note
        // or when save new GRN, newButton is shown depends on Order status
        const index = nextProps.grnData.findIndex(grn => grn.id === Number(nextProps.selectedGrnId));
        this.setState({
          tableFieldName: `grn[${index}].list`,
          noteFieldName: `grn[${index}].internalNotes`,
          selectFieldName: 'selectedGrnId',
          newButtonVisible: true
        });
      } else if (this.props.initialValues.grn.length !== 0 &&
        nextProps.initialValues.grn.length !== this.props.initialValues.grn.length) {
        // when save drafted GRN, to show saved data
        // also show new button depends on Order status
        const index = nextProps.initialValues.grn.length - 1;
        this.setState({
          tableFieldName: `grn[${index}].list`,
          noteFieldName: `grn[${index}].internalNotes`,
          newButtonVisible: true
        });
      }
    }
  }

  handleSaveGrn = (formValues, operation) => {
    this.props.purchaseOrderGRNSaveRequest({
      id: this.props.initialValues.id,
      payload: prepareGRN(formValues.newGrn, operation)
    });
  }

  handleUpdateGrn = (formValues, operation) => {
    this.props.purchaseOrderGRNUpdateRequest({
      id: this.props.initialValues.id,
      payload: prepareGRN(formValues.newGrn, operation)
    });
  }

  handleAddNewGrn = () => {
    this.setState({
      newButtonVisible: false,
      tableFieldName: 'newGrn.list',
      noteFieldName: 'newGrn.internalNotes',
      selectFieldName: 'selectNewGrn'
    });
  }

  render() {
    const {
      grnData,
      selectedGrnId,
      newGrn,
      status,
      handleSubmit
    } = this.props;

    const {
      selectFieldName,
      tableFieldName,
      noteFieldName,
      newButtonVisible
    } = this.state;

    const {
      saveButtonVisible,
      saveButtonHandler,
      updateButtonVisible,
      updateButtonHandler,
    } = getButtonsByStatus(
      status,
      this.handleSaveGrn,
      this.handleUpdateGrn,
      newGrn
    );

    const isNotInReceivedStatus = status.toLowerCase() !== 'received';

    // check whether to disable formData and enable select
    // newButtonVisible needed here to enable editing formData, when newButton clicked
    const disabled = (selectedGrnId && newButtonVisible) || this.props.disabled;
    const selectDisabled = isNotInReceivedStatus && !newButtonVisible;

    return (
      <div>
        <span>
          { selectedGrnId &&
            <Row middle="xs">
              <Col xs={ 3 } md={ 1 } lg={ 1 }>
                <label>
                  <strong>GRN No:</strong>
                </label>
              </Col>
              <Col xs={ 9 } md={ 4 } lg={ 3 }>
                <Field
                  name={ selectFieldName }
                  component={ FormSelect }
                  menuItems={ grnData.map(grn => ({ key: grn.id, value: grn.grnNo })) }
                  disabled={ selectDisabled }
                />
              </Col>
              { isNotInReceivedStatus && newButtonVisible &&
                <Col xs md lg>
                  <ActionButton
                    className={ newGrnButton }
                    onClick={ this.handleAddNewGrn }
                  >
                    New Grn
                  </ActionButton>
                </Col>
              }
            </Row>
          }
        </span>
        <Row>
          <Col xs>
            <Field
              name={ tableFieldName }
              disabled={ disabled }
              columns={ columns(disabled) }
              component={ FormGridTable }
            />
          </Col>
        </Row>
        <Row middle="xs" start="xs">
          <Col xs={ 12 } md={ 3 } lg={ 1 }>
            <strong>Internal Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 5 }>
            <Field
              name={ noteFieldName }
              placeholder="Any text"
              disabled={ disabled }
              component={ FormTextArea }
            />
          </Col>
        </Row>
        <Controls
          saveButtonVisible={ saveButtonVisible }
          saveButtonText="Receive"
          onSaveButtonClick={ saveButtonHandler && handleSubmit(saveButtonHandler) }
          updateButtonVisible={ updateButtonVisible }
          updateButtonText="Save as Draft"
          onUpdateButtonClick={ updateButtonHandler && handleSubmit(updateButtonHandler) }
          cancelButtonVisible={ false }
        />
      </div>
    );
  }
}

GRNTab.propTypes = {
  // data
  status: PropTypes.string.isRequired,
  grnData: PropTypes.array,
  selectedGrnId: PropTypes.number,
  newGrn: PropTypes.object,
  initialValues: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  // form
  handleSubmit: PropTypes.func.isRequired,
  // redux-base
  purchaseOrderGRNSaveRequest: PropTypes.func.isRequired,
  purchaseOrderGRNUpdateRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GRNTab);
