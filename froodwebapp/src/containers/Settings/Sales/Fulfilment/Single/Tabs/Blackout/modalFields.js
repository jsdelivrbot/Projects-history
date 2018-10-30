export default () => ([{
  header: 'From',
  type: 'datePicker',
  name: 'startDate',
  editableForExistingItem: true,
}, {
  header: 'To',
  type: 'datePicker',
  name: 'endDate',
  editableForExistingItem: true,
}, {
  header: 'Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: true,
}]);
