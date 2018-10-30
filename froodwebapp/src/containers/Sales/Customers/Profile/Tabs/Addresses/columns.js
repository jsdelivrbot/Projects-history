import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDelete) => [{
  title: 'Label',
  dataIndex: 'label'
}, {
  title: 'Address',
  dataIndex: 'address',
  render: (text, record) => (
    `${record.address1} ${record.address2}`
  )
}, {
  title: 'Suburb',
  dataIndex: 'suburb'
}, {
  title: 'City',
  dataIndex: 'cityName'
}, {
  title: 'State',
  dataIndex: 'stateName'
}, {
  title: 'Postal Code',
  dataIndex: 'postalCode'
}, {
  title: 'Default',
  type: 'checkbox',
  dataIndex: 'isDefault'
}, {
  title: 'Actions',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      deleteButtonVisible
      handleEdit={ handleEdit }
      handleDeactivate={ handleDelete }
    />
  )
}];
