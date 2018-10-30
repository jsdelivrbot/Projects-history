import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate) => [{
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
  title: 'ACTIONS',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleDeactivate }
      deleteButtonVisible
    />
  )
}];
