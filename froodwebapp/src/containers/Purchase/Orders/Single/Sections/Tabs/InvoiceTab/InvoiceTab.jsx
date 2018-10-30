import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Icon } from 'antd';
import { Field, formValueSelector } from 'redux-form';
import { purchaseOrderInvoiceUpdateRequest } from 'redux-base/actions';
import {
  FormGridTable,
  FormSelect,
  FormInput,
  FormInputNumber,
  FormDatePicker,
  Controls,
  Button
} from 'components';
import { columns, prepareInvoice } from './invoiceTabHelpers';
import { invoiceCard, uploadButton, errorMessage } from './InvoiceTab.scss';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  selectedInvoiceGrnNo: selector(state, 'selectedInvoiceGrnNo'),
  loadingPage: state.purchaseOrder.loadingPage,
  invoices: state.purchaseOrder.initialValues.invoices
});

const mapDispatchToProps = {
  purchaseOrderInvoiceUpdateRequest
};

class InvoiceTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disabled: false,
      errorMessageVisible: '',
      tableFieldName: 'invoices[0].list',
      invoiceNoFieldName: 'invoices[0].invoiceNo',
      invoiceDateFieldName: 'invoices[0].invoiceDate',
      invoiceAmountFieldName: 'invoices[0].invoiceAmount'
    };
  }

  componentWillReceiveProps(nextProps) {
    // when change select to show related table and redux fields
    if (nextProps.selectedInvoiceGrnNo && nextProps.selectedInvoiceGrnNo !== this.props.selectedInvoiceGrnNo) {
      const index = nextProps.invoices.findIndex(invoice => invoice.grnNo === nextProps.selectedInvoiceGrnNo);
      const disabled = !!nextProps.invoices[index].list.find(item => item.invoiceChecked);
      this.setState({
        index,
        disabled,
        tableFieldName: `invoices[${index}].list`,
        invoiceNoFieldName: `invoices[${index}].invoiceNo`,
        invoiceDateFieldName: `invoices[${index}].invoiceDate`,
        invoiceAmountFieldName: `invoices[${index}].invoiceAmount`
      });
    }
  }

  handleSaveInvoice = (formValues) => {
    const { index } = this.state;
    const isTableUnChecked = formValues.invoices[index].list.find(item => !item.invoiceChecked);
    if (isTableUnChecked) {
      this.setState({
        errorMessageVisible: true
      });
    } else {
      this.setState({
        errorMessageVisible: false
      }, () => this.props.purchaseOrderInvoiceUpdateRequest({
        id: formValues.id,
        payload: prepareInvoice(formValues.invoices[index])
      }));
    }
  }

  render() {
    const {
      disabled,
      errorMessageVisible,
      tableFieldName,
      invoiceNoFieldName,
      invoiceDateFieldName,
      invoiceAmountFieldName
    } = this.state;

    const {
      invoices,
      handleSubmit
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs md lg>
            <Card className={ invoiceCard }>
              <Row center="xs" middle="xs">
                <Col xs md={ 6 } lg={ 6 }>
                  <Row middle="xs">
                    <Col xs={ 6 } mdOffset={ 2 } md={ 3 } lgOffset={ 1 } lg={ 3 }>
                      <label>
                        <strong>GRN No:</strong>
                      </label>
                    </Col>
                    <Col xs={ 6 } md={ 6 } lg={ 6 }>
                      <Field
                        name="selectedInvoiceGrnNo"
                        component={ FormSelect }
                        menuItems={ invoices.map(invoice => ({ key: invoice.grnNo, value: invoice.grnNo })) }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 6 } mdOffset={ 2 } md={ 3 } lgOffset={ 1 } lg={ 3 }>
                      <label>
                        <strong>Supplier Invoice No:</strong>
                      </label>
                    </Col>
                    <Col xs={ 6 } md={ 6 } lg={ 6 }>
                      <Field
                        name={ invoiceNoFieldName }
                        placeholder="Supplier Invoice"
                        component={ FormInput }
                        disabled={ disabled }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 6 } mdOffset={ 2 } md={ 3 } lgOffset={ 1 } lg={ 3 }>
                      <label>
                        <strong>Invoice Date:</strong>
                      </label>
                    </Col>
                    <Col xs={ 6 } md={ 6 } lg={ 6 }>
                      <Field
                        name={ invoiceDateFieldName }
                        component={ FormDatePicker }
                        activeFromToday
                        disabled={ disabled }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 6 } mdOffset={ 2 } md={ 3 } lgOffset={ 1 } lg={ 3 }>
                      <label>
                        <strong>Invoice Amount</strong>
                      </label>
                    </Col>
                    <Col xs={ 6 } md={ 6 } lg={ 6 }>
                      <Field
                        name={ invoiceAmountFieldName }
                        placeholder="Invoice Amount in dealing currency"
                        component={ FormInputNumber }
                        min={ 0 }
                        disabled={ disabled }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs md={ 11 } lg={ 10 }>
                      <Controls
                        saveButtonVisible={ !disabled }
                        saveButtonText="Save"
                        onSaveButtonClick={ handleSubmit(this.handleSaveInvoice) }
                        cancelButtonVisible={ false }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs md={ 6 } lg={ 6 }>
                  <Button className={ uploadButton }>
                    <Icon type="plus" />
                    <span>Upload</span>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row center="xs">
          { errorMessageVisible &&
            <Col xs={ 12 }>
              <div className={ errorMessage }>All items in table must be checked</div>
            </Col>
          }
          <Col xs>
            <Field
              name={ tableFieldName }
              columns={ columns(disabled) }
              component={ FormGridTable }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

InvoiceTab.propTypes = {
  // data
  invoices: PropTypes.array.isRequired,
  selectedInvoiceGrnNo: PropTypes.string,
  // form
  handleSubmit: PropTypes.func.isRequired,
  // redux-base
  purchaseOrderInvoiceUpdateRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTab);
