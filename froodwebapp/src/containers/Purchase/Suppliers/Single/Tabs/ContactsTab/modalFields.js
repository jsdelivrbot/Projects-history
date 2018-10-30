export default locations => [{
  header: 'Location',
  type: 'select',
  name: 'locationId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: locations.map(location => ({ key: location.id, value: location.name }))
}, {
  header: 'First Name',
  type: 'text',
  name: 'firstName',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Last Name',
  type: 'text',
  name: 'lastName',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Phone Number',
  type: 'text',
  name: 'phone',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Fax',
  type: 'text',
  name: 'fax',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Email',
  type: 'text',
  name: 'email',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Corporate Title',
  type: 'text',
  name: 'title',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  text: 'Make this default contact',
  type: 'checkbox',
  name: 'isDefault',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  text: 'Include in all emails',
  type: 'checkbox',
  name: 'includeInEmails',
  editableForExistingItem: true,
  editableForNewItem: true,
}];
