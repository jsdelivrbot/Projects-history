import React from 'react';
import { TableActionButtons } from 'components';

export default handleEdit => [{
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Code',
  dataIndex: 'code'
}, {
  title: 'Description',
  dataIndex: 'description'
}, {
  title: 'Currency',
  dataIndex: 'currency'
}, {
  title: 'Type',
  dataIndex: 'typeDescription'
}, {
  title: 'Use Count',
  dataIndex: 'useCount'
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
