import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate, handleActivate) => [{
  title: 'Tax Category',
  dataIndex: 'name',
  width: '20%'
}, {
  title: 'Buy Tax Code',
  dataIndex: 'buyRate.code',
  width: '20%'
}, {
  title: 'Sell Tax Code',
  dataIndex: 'sellRate.code',
  width: '20%'
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
