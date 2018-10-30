import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate, handleActivate) => [{
  title: 'Tax Name',
  dataIndex: 'name',
  width: '20%',
}, {
  title: 'Tax Code',
  dataIndex: 'code',
  width: '20%',
}, {
  title: 'Tax Rate',
  width: '20%',
  render: (text, record) => (
    `${record.rate}%`
  )
}, {
  title: 'Status',
  dataIndex: 'isActive',
  width: '20%',
  render: text => (
    text ? 'Active' : 'Not Active'
  )
}, {
  title: 'Action',
  width: '20%',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleDeactivate }
      handleActivate={ handleActivate }
      activateButtonVisible
    />
  )
}];
