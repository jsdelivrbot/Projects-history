import React from 'react';
import { TableActionButtons } from 'components';

export const columns = (handleEdit, handleDeactivate) => [{
  title: 'SKU',
  dataIndex: 'sku'
}, {
  title: 'UOM TYPE',
  dataIndex: 'typeDescription'
}, {
  title: 'QUANTITY',
  dataIndex: 'fromQty'
}, {
  title: 'UOM',
  dataIndex: 'fromName'
}, {
  title: 'EQUALS',
  dataIndex: 'eq',
  render: () => '='
}, {
  title: 'QUANTITY',
  dataIndex: 'toQty'
}, {
  title: 'UOM',
  dataIndex: 'toName'
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleDeactivate }
      deleteButtonVisible
    />
  )
}];

export const modifyData = (skuUOMS, selectedSKUId) => (
  skuUOMS.map(uom => (
    Object.assign({}, uom, {
      sku: selectedSKUId,
    })
  ))
);

