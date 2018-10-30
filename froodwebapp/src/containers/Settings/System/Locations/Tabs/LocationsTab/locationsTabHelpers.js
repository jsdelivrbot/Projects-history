export default [{
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Address',
  dataIndex: 'address',
  render: (text, record) => (
    `${record.address1 || ''}, ${record.address2 || ''}, ${record.suburb || ''}, ${record.cityName || ''}, ${record.stateName || ''}`
  )
}, {
  title: 'Active',
  dataIndex: 'isActive',
  type: 'checkbox'
}, {
  title: 'Default',
  dataIndex: 'isDefault',
  type: 'checkbox'
}, {
  title: 'Holds Stock',
  dataIndex: 'holdStock',
  type: 'checkbox'
}, {
  title: 'Actions',
  dataIndex: 'actions',
  type: 'modalButton',
  text: 'Edit'
}];
