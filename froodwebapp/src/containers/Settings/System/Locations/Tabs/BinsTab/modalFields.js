export default zoneTypes => [{
  header: 'Zone',
  type: 'select',
  name: 'zoneId',
  editableForExistingItem: false,
  editableForNewItem: true,
  menuItems: zoneTypes.map(item => ({ key: item.id, value: item.name }))
}, {
  header: 'Bin Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'Description',
  type: 'text',
  name: 'description',
  editableForExistingItem: true,
  editableForNewItem: true,
}];
