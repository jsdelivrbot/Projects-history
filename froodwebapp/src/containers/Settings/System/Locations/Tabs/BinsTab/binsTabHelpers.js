import React from 'react';
import { TableActionButtons } from 'components';

export default handleEdit => [{
  title: 'ZONE',
  dataIndex: 'zoneName'
}, {
  title: 'BIN NAME',
  dataIndex: 'name'
}, {
  title: 'DESCRIPTION',
  dataIndex: 'description'
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
    />
  )
}];
