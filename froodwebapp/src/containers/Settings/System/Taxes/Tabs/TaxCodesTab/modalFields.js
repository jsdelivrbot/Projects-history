export default (formatter, parser) => ([{
  header: 'Tax Code Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'Tax Code',
  type: 'text',
  name: 'code',
  editableForExistingItem: false,
  editableForNewItem: true,
}, {
  header: 'Tax Amount',
  type: 'number',
  name: 'rate',
  min: 0,
  formatter,
  parser,
  editableForExistingItem: true,
  editableForNewItem: true,
}]);
