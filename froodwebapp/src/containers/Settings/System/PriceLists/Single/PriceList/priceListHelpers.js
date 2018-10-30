import React from 'react';
import { TableActionButtons } from 'components';

export default handleEdit => [{
  title: 'SKU',
  dataIndex: 'sku'
}, {
  title: 'UOM',
  dataIndex: 'uomName'
}, {
  title: 'CATEGORY',
  dataIndex: 'categoryName'
}, {
  title: 'Currency',
  dataIndex: 'currencyName'
}, {
  title: 'Price',
  dataIndex: 'price'
}, {
  title: 'Tax',
  dataIndex: 'tax'
}, {
  title: 'List Price',
  dataIndex: 'listPrice'
}, {
  title: 'Actions',
  dataIndex: 'actions',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
    />
  ),
}];
