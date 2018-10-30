import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate, handleActivate) => [{
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Email',
  dataIndex: 'email'
}, {
  title: 'Role',
  dataIndex: 'role'
}, {
  title: 'Status',
  dataIndex: 'isActive',
  render: text => (
    text ? 'Active' : 'Not Active'
  )
}, {
  title: 'Last Login',
  dataIndex: 'lastLoginTime'
}, {
  title: 'Action',
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
