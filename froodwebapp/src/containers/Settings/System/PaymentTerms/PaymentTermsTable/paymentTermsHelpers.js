import React from 'react';
import { TableActionButtons } from 'components';

export const columns = (handleEdit, handleDeactivate, handleActivate) => [{
  title: 'Terms',
  dataIndex: 'name',
  width: '33%'
}, {
  title: 'Due In Days',
  dataIndex: 'dueDays',
  width: '33%'
}, {
  title: 'Action',
  width: '33%',
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

// add string to dueDays
export const addStringsToDueDays = (paymentTerms, fromFields) => (
  paymentTerms.map(pt => ({
    id: pt.id,
    name: pt.name,
    isActive: pt.isActive,
    dueDays: `${pt.dueDays} Days from ${fromFields.find(field => field.id === Number(pt.from)).name}`,
  }))
);
