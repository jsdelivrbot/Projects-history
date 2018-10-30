import React from 'react';
import { TableActionButtons } from 'components';

export default (
  handleSave,
  handleUpdate,
  handleActivate,
  handleDeactivate,
  handleMoveSku,
  toVaraiantMenuItems) => [{
  title: 'SKU/Variant',
  dataIndex: 'fromVariant'
}, {
  title: 'Move to SKU/Variant',
  dataIndex: 'toVariant',
  type: 'select',
  menuItems: toVaraiantMenuItems
}, {
  title: 'Days After Manufacturing',
  dataIndex: 'daysAfterMfg',
  type: 'number'
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      editButtonVisible={ false }
      saveButtonVisible={ !record.slcId }
      handleSave={ handleSave }
      updateButtonVisible={ !!record.slcId && !record.isActive }
      handleUpdate={ handleUpdate }
      activateButtonVisible
      handleActivate={ handleActivate }
      handleDeactivate={ handleDeactivate }
      customButtonVisible={ !!record.slcId }
      customButtonText="Move Now"
      handleCustomClick={ handleMoveSku }
    />
  )
}];
