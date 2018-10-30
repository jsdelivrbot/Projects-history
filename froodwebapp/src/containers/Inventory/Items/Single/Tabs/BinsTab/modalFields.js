import { getMenuItems } from 'utils';

export default (skus, availableBins) => (
  [{
    header: 'SKU/Variant',
    type: 'select',
    name: 'skuId',
    editableForExistingItem: false,
    editableForNewItem: true,
    menuItems: skus
  }, {
    header: 'Bin',
    type: 'select',
    name: 'binId',
    editableForExistingItem: true,
    editableForNewItem: true,
    menuItems: getMenuItems(availableBins)
  }, {
    header: 'Reorder Threashold',
    type: 'text',
    name: 'reorderThreshold',
    editableForExistingItem: true,
    editableForNewItem: true
  }, {
    header: 'Reorder Quantity',
    type: 'text',
    name: 'reorderQty',
    editableForExistingItem: true,
    editableForNewItem: true,
  }]
);

