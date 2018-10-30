export default bundleLocationId => [{
  header: 'SKU/Variant',
  type: 'skuAutoComplete',
  name: 'sku',
  filterByLocationId: bundleLocationId,
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'Category',
  type: 'text',
  name: 'categoryName',
  editableForExistingItem: false,
  editableForNewItem: false
}, {
  header: 'UOM',
  type: 'text',
  name: 'uomName',
  editableForExistingItem: false,
  editableForNewItem: false
}, {
  header: 'Quantity to add in Bundle',
  type: 'number',
  name: 'qty',
  editableForExistingItem: true,
  editableForNewItem: true
}];
