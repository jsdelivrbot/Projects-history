// @flow
import { getMenuItems } from 'utils';

type FormMenuItems = Array<{
  id: number,
  name: string
}>

export default (
  handleStateSelect: Function,
  states: FormMenuItems,
  cities: FormMenuItems
) => ([{
  header: 'Label',
  type: 'text',
  name: 'label',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Postal Code',
  type: 'text',
  name: 'postalCode',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'State',
  type: 'select',
  name: 'state',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(states)
}, {
  header: 'City',
  type: 'select',
  name: 'city',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(cities)
}, {
  header: 'Suburb',
  type: 'text',
  name: 'suburb',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Address Line 1',
  type: 'text',
  name: 'address1',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Address Line 2',
  type: 'text',
  name: 'address2',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  text: 'Make this default address',
  type: 'checkbox',
  name: 'isDefault',
  editableForExistingItem: true,
  editableForNewItem: true,
}]);
