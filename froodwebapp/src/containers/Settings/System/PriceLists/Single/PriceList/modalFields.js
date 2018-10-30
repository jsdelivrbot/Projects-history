export default [{
  header: 'SKU/Variant',
  type: 'skuAutoComplete',
  name: 'sku',
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'UOM',
  type: 'text',
  name: 'uomName',
  editableForExistingItem: false,
  editableForNewItem: false
}, {
  header: 'Currency',
  type: 'text',
  name: 'currencyName',
  editableForExistingItem: false,
  editableForNewItem: false
}, {
  header: 'Price (Include Tax or Exclude Tax)',
  type: 'text',
  name: 'price',
  editableForExistingItem: true,
  editableForNewItem: true
}];
