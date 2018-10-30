import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate) => [{
  title: 'UOM',
  dataIndex: 'name',
  width: '25%'
}, {
  title: 'Description',
  dataIndex: 'description',
  width: '55%'
}, {
  title: 'Actions',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleDeactivate }
      deleteButtonVisible
    />
  )
}];
