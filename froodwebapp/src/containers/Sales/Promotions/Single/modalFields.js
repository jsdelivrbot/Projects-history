export default isSku => [{
  header: isSku ? 'SKU' : 'Bundle',
  type: isSku ? 'skuAutoComplete' : 'bundleAutoComplete',
  name: 'sku',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Product Name',
  type: 'text',
  name: 'productName',
  editableForExistingItem: false,
  editableForNewItem: true,
}];
