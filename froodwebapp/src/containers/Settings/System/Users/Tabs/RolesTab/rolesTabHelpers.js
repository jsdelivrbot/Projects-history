import React from 'react';
import { TableActionButtons } from 'components';

export const columns = (handleEdit, handleDeactivate, handleActivate) => [{
  title: 'Role',
  dataIndex: 'name',
  width: '33%'
}, {
  title: 'Status',
  dataIndex: 'isActive',
  width: '33%',
  render: text => (
    text ? 'Active' : 'Not Active'
  )
}, {
  title: 'Action',
  width: '34%',
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

export const prepareData = roles => (
  roles.map(role => ({
    id: role.id,
    name: role.name,
    isActive: role.isActive
  }))
);
