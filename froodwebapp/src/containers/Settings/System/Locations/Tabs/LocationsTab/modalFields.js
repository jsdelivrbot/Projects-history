import { getMenuItems } from 'utils';

export default (
  states,
  cities,
  locationTypes
) => ([{
  header: 'Location Name',
  type: 'text',
  name: 'name',
  editableForExistingItem: true,
  editableForNewItem: true,
}, {
  header: 'Location Prefix',
  type: 'text',
  editableForExistingItem: false,
  editableForNewItem: true,
  name: 'prefix'
}, {
  header: 'State',
  type: 'select',
  name: 'stateId',
  editableForExistingItem: true,
  editableForNewItem: true,
  menuItems: getMenuItems(states)
}, {
  header: 'City',
  type: 'select',
  name: 'cityId',
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
  header: 'Postal Code',
  type: 'text',
  name: 'postalCode',
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
  header: 'Location Type',
  type: 'select',
  name: 'type',
  editableForExistingItem: false,
  editableForNewItem: true,
  menuItems: getMenuItems(locationTypes)
}]);
