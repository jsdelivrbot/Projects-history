import { getMenuItems } from 'utils';

export default (uoms, skus) => (
  [{
    header: 'SKU/Variant',
    type: 'select',
    name: 'skuId',
    editableForExistingItem: false,
    editableForNewItem: true,
    menuItems: skus
  }, {
    header: 'Rate',
    type: 'text',
    name: 'fromQty',
    editableForExistingItem: true,
    editableForNewItem: true,
  }, {
    header: 'Unit',
    type: 'select',
    name: 'fromId',
    editableForExistingItem: false,
    editableForNewItem: true,
    menuItems: getMenuItems(uoms)
  }, {
    header: 'EQUALS',
    name: 'equals',
  }, {
    header: 'Rate',
    type: 'text',
    name: 'toQty',
    editableForExistingItem: true,
    editableForNewItem: true,
  }, {
    header: 'Unit',
    type: 'select',
    name: 'toId',
    editableForExistingItem: true,
    editableForNewItem: true,
    menuItems: getMenuItems(uoms)
  }]
);

