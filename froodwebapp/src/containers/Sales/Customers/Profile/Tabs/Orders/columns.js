import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleCancel) => [{
  title: 'Order No',
  dataIndex: 'id',
}, {
  title: 'Paid',
  dataIndex: 'paidOrder',
}, {
  title: 'Order Date',
  dataIndex: 'orderDate',
}, {
  title: 'Delivery On',
  dataIndex: 'expectedDeliveryDate',
}, {
  title: 'Pick Up Date',
  dataIndex: 'pickUpDate',
}, {
  title: 'Status',
  dataIndex: 'status',
}, {
  title: 'Promotion Discount',
  dataIndex: 'promotionDiscount',
}, {
  title: 'Actions',
  dataIndex: 'action',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleCancel }
      deleteButtonVisible
    />
  )
}];
