import React from 'react';
import { TableActionButtons } from 'components';
import { Checkbox } from 'antd';

export default handleEdit => [{
  title: 'SKU',
  dataIndex: 'sku',
}, {
  title: 'SUPPLIER',
  dataIndex: 'supplierName',
}, {
  title: 'SUPPLIER SKU',
  dataIndex: 'supplierSku',
}, {
  title: 'SUPPLIER PRODUCT NAME',
  dataIndex: 'supplierSkuName',
}, {
  title: 'PURCHASE UOM',
  dataIndex: 'uomName',
}, {
  title: 'MIN PURCHASE QTY',
  dataIndex: 'minPurchaseQuantity',
}, {
  title: 'LAST SUPPLIED',
  dataIndex: 'lastSupplied',
}, {
  title: 'DEFAULT',
  dataIndex: 'isDefault',
  render: checked => (
    <Checkbox checked={ checked } disabled />
  )
}, {
  title: 'ACTION',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
    />
  )
}];

