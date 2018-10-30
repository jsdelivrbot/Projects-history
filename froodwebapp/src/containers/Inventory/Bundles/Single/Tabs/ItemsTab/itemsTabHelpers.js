import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate) => [{
  title: 'SKU',
  dataIndex: 'sku',
}, {
  title: 'Name',
  dataIndex: 'skuName',
}, {
  title: 'Category',
  dataIndex: 'categoryName',
}, {
  title: 'UOM',
  dataIndex: 'uomName',
}, {
  title: 'Quantity',
  dataIndex: 'qty',
}, {
  title: 'Action',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleDeactivate }
      deleteButtonVisible
    />
  )
}];
