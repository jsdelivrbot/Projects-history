import { getMenuItems } from 'utils';

export default roles => ([{
  header: 'Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'Email Address',
  type: 'text',
  name: 'email',
  editableForExistingItem: false,
  editableForNewItem: true
}, {
  header: 'Role',
  type: 'select',
  name: 'roleId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(roles)
}]);
