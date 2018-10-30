import { getMenuItems } from 'utils';

export default (uoms, skus) => ([{
  header: 'SKU/Variant',
  type: 'select',
  name: 'sku',
  editableForExistingItem: false,
  editableForNewItem: true,
  menuItems: skus
}, {
  header: 'Choose Supplier Name or Add new',
  type: 'supplierAutoComplete',
  name: 'supplierId',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'Supplier SKU',
  type: 'text',
  name: 'supplierSku',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'Suplier Product Name',
  type: 'text',
  name: 'supplierSkuName',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'UOM',
  type: 'select',
  name: 'uomId',
  editableForExistingItem: false,
  editableForNewItem: true,
  menuItems: getMenuItems(uoms)
}, {
  header: 'Min Purchase Quantity',
  type: 'number',
  name: 'minPurchaseQuantity',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  text: 'Make this suppplier default for SKU',
  type: 'checkbox',
  name: 'isDefault',
  editableForExistingItem: true,
  editableForNewItem: true,
}]);

