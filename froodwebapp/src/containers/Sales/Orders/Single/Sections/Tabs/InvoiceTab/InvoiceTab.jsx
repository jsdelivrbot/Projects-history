import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { OrderTabHeader } from 'components';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { table } from 'styles/common.scss';
import ConnectedInvoiceTotalAndNotes from './InvoiceTotalAndNotes/InvoiceTotalAndNotes';

const mapStateToProps = state => ({
  data: state.order.invoiceData,
});

const renderTextWith$ = text => (<div>{ `${text} $` }</div>);

const columns = [{
  title: 'ORDER TYPE',
  render: (text, record) => (
    <div>{ record.isRecurring ? 'Recurring' : 'Single Purchase' }</div>
  )
}, {
  title: 'ITEM NAME',
  dataIndex: 'name'
}, {
  title: 'UOM',
  dataIndex: 'uomName'
}, {
  title: 'ORDER QTY',
  dataIndex: 'orderQty'
}, {
  title: 'PRICE',
  dataIndex: 'price',
  render: renderTextWith$
}, {
  title: 'DISCOUNT',
  dataIndex: 'discount',
  render: renderTextWith$
}, {
  title: 'TAX',
  dataIndex: 'tax',
  render: renderTextWith$
}, {
  title: 'TOTAL',
  dataIndex: 'total',
  render: renderTextWith$
}];

export const InvoiceTab = ({ data }) => (
  <div>
    <OrderTabHeader
      header={ data && data.invoiceNo }
      headerLabel="Tax Invoice"
      primaryButtonText="Download"
    >
      <Row>
        <Col lg>
          Payment Date: { data && data.paymentDate }
        </Col>
      </Row>
    </OrderTabHeader>
    <Row>
      <Col xs>
        <Table
          className={ table }
          rowKey="lineNo"
          columns={ columns }
          dataSource={ data.list }
          size="small"
          pagination={ false }
        />
        <ConnectedInvoiceTotalAndNotes
          data={ data }
        />
      </Col>
    </Row>
  </div>
);

InvoiceTab.propTypes = {
  data: PropTypes.object
};

export default connect(mapStateToProps)(InvoiceTab);
