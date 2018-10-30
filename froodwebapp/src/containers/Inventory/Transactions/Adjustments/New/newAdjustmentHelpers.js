export default reasonMenuItems => [{
  title: 'BATCH',
  dataIndex: 'batch',
}, {
  title: 'EXPIRY',
  dataIndex: 'expiry',
}, {
  title: 'Stock in hand',
  dataIndex: 'stockInHand',
}, {
  title: 'Adjustment',
  dataIndex: 'adjustment',
  type: 'number',
  max: 0,
}, {
  title: 'New adjusted qty',
  dataIndex: 'newAdjustQty',
}, {
  title: 'Adjustment Reason',
  dataIndex: 'reasonId',
  type: 'select',
  menuItems: reasonMenuItems
}];
