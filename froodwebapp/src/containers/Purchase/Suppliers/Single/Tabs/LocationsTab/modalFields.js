// @flow
type FormMenuItems = Array<{
  id: number,
  name: string
}>

export default (
  states: FormMenuItems,
  cities: FormMenuItems,
  locationTypes: FormMenuItems,
) => (
  [{
    header: 'Location Name',
    type: 'text',
    name: 'name',
    editableForExistingItem: false,
    editableForNewItem: true,
  }, {
    header: 'Location Prefix',
    type: 'text',
    name: 'prefix',
    editableForExistingItem: false,
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
    name: 'stateId',
    editableForExistingItem: true,
    editableForNewItem: true,
    menuItems: states.map(state => ({ key: state.id, value: state.name }))
  }, {
    header: 'City',
    type: 'select',
    name: 'cityId',
    editableForExistingItem: true,
    editableForNewItem: true,
    menuItems: cities.map(city => ({ key: city.id, value: city.name }))
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
    header: 'Location Type',
    type: 'select',
    name: 'type',
    editableForExistingItem: false,
    editableForNewItem: true,
    menuItems: locationTypes.map(type => ({ key: type.id, value: type.name }))
  }]
);
