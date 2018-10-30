export default (
  [{
    header: 'Customer',
    type: 'text',
    name: 'customerName',
    editableForExistingItem: false,
    editableForNewItem: false
  }, {
    header: 'Add credit amount',
    type: 'number',
    name: 'creditAmount',
    editableForExistingItem: true,
    editableForNewItem: true
  }, {
    header: 'Credit description',
    type: 'textarea',
    name: 'description',
    editableForExistingItem: true,
    editableForNewItem: true
  }]
);
