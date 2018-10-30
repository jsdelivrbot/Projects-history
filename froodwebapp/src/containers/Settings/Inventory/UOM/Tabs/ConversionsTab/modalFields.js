import { getMenuItems } from 'utils';

export default uom => ([{
  header: 'Rate',
  type: 'text',
  name: 'fromQty',
  editableForExistingItem: true,
  editableForNewItem: true
}, {
  header: 'Unit',
  type: 'text',
  name: 'fromUnit',
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'Rate',
  type: 'text',
  name: 'toQty',
  editableForExistingItem: true,
  editableForNewItem: true
}, {
  header: 'Unit',
  type: 'select',
  name: 'toId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(uom)
}]);
