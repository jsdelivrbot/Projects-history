export default zoneTypes => [{
  header: 'Zone Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: true,
  editableForNewItem: true
}, {
  header: 'Zone Type',
  type: 'select',
  name: 'type',
  editableForExistingItem: false,
  editableForNewItem: true,
  menuItems: zoneTypes.map(item => ({ key: item.id, value: item.name }))
}];
