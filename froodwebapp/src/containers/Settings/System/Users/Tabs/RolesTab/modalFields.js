import { getMenuItems } from 'utils';

export default roles => ([{
  header: 'Role',
  type: 'text',
  name: 'name',
  editableForExistingItem: true,
  editableForNewItem: true
}, {
  header: 'Clone From',
  type: 'select',
  name: 'cloneId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(roles)
}]);
