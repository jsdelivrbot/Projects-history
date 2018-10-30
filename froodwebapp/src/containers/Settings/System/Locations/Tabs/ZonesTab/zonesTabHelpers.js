import React from 'react';
import { TableActionButtons } from 'components';

export default handleEdit => [{
  title: 'ZONE NAME',
  dataIndex: 'name'
}, {
  title: 'ZONE TYPE',
  dataIndex: 'typeDescription'
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
    />
  )
}];
