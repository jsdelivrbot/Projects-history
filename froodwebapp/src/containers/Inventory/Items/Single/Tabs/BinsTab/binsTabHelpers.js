import React from 'react';
import { TableActionButtons } from 'components';

export default handleEdit => [{
  title: 'SKU',
  dataIndex: 'sku'
}, {
  title: 'Bin',
  dataIndex: 'binName'
}, {
  title: 'Reorder Threshold',
  dataIndex: 'reorderThreshold'
}, {
  title: 'Reorder Qty',
  dataIndex: 'reorderQty'
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
    />
  )
}];

