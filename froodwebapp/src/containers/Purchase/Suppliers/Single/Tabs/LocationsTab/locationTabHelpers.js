import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleDeactivate) => [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Address',
  dataIndex: 'address1',
  width: '30%'
}, {
  title: 'City',
  dataIndex: 'cityName',
}, {
  title: 'State',
  dataIndex: 'stateName',
}, {
  title: 'Postal Code',
  dataIndex: 'postalCode',
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
