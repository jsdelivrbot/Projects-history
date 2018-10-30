export default taxCodes => ([{
  header: 'Tax Category Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'Buy Tax Code',
  type: 'select',
  name: 'buyRateId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: taxCodes.map(cat => ({ key: cat.id, value: cat.code }))
}, {
  header: 'Sell Tax Code',
  type: 'select',
  name: 'sellRateId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: taxCodes.map(cat => ({ key: cat.id, value: cat.code }))
}]);
