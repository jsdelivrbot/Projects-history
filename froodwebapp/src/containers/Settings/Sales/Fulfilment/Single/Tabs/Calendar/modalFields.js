export default isEditableDeliveries => ({
  newSlot: [{
    header: 'From',
    type: 'timePicker',
    name: 'from',
    editableForExistingItem: true,
  }, {
    header: 'To',
    type: 'timePicker',
    name: 'to',
    editableForExistingItem: true,
  }, {
    header: 'Delivery Limit',
    type: 'checkbox',
    name: 'isDeliveryLimited',
    editableForExistingItem: true,
  }, {
    header: 'Number Of Deliveries',
    type: 'number',
    name: 'deliveries',
    editableForExistingItem: isEditableDeliveries,
  }],
  editSlot: [{
    header: 'Delivery Limit',
    type: 'checkbox',
    name: 'isDeliveryLimited',
    text: '',
    editableForExistingItem: true,
  }, {
    header: 'Number Of Deliveries',
    type: 'number',
    name: 'deliveries',
    editableForExistingItem: isEditableDeliveries,
  }]
});
