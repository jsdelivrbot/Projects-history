import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate) => [{
  title: 'Name',
  render: (text, record) => `${record.firstName} ${record.lastName}`
}, {
  title: 'Phone',
  dataIndex: 'phone',
}, {
  title: 'Fax',
  dataIndex: 'fax',
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Title',
  dataIndex: 'title',
}, {
  title: 'Default',
  dataIndex: 'isDefault',
  type: 'checkbox'
}, {
  title: 'Include in Emails',
  dataIndex: 'includeInEmails',
  type: 'checkbox'
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
