import React from 'react';
import {
  TableActionButtons
} from 'components';

export default handleConfirm => [{
  title: 'Item/Variant',
  dataIndex: 'sku',
}, {
  title: 'Bin',
  dataIndex: 'binCode',
}, {
  title: 'Batch Number',
  dataIndex: 'batch',
}, {
  title: 'Stock In Hand',
  dataIndex: 'stockOnHand',
}, {
  title: 'New Quantity',
  dataIndex: 'newQty',
  min: 0,
  type: 'number'
}, {
  title: 'Change',
  dataIndex: 'change',
}, {
  title: '',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      confirmButtonVisible={ record.status === 'Pending' }
      confirmedButtonVisible={ record.status !== 'Pending' }
      handleConfirm={ handleConfirm }
      editButtonVisible={ false }
    />
  )
}];
