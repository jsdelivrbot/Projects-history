export default fromFields => (
  [{
    header: 'Term',
    type: 'text',
    name: 'name',
    editableForExistingItem: false,
    editableForNewItem: true
  }, {
    header: 'Due In Days',
    type: 'text',
    name: 'dueDays',
    editableForExistingItem: true,
    editableForNewItem: true
  }, {
    header: 'From',
    type: 'select',
    name: 'from',
    editableForExistingItem: true,
    editableForNewItem: true,
    menuItems: fromFields.map(field => ({ key: field.id, value: field.name }))
  }]
);
