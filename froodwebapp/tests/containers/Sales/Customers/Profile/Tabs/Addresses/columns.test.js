import columns from 'containers/Sales/Customers/Profile/Tabs/Addresses/columns';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;
const arrayToCompare = [{
  title: 'Label',
  dataIndex: 'label'
}, {
  title: 'Address',
  dataIndex: 'address',
  render: () => (
    <p>Some jsx</p>
  )
}, {
  title: 'Suburb',
  dataIndex: 'suburb'
}, {
  title: 'City',
  dataIndex: 'cityName'
}, {
  title: 'State',
  dataIndex: 'stateName'
}, {
  title: 'Postal Code',
  dataIndex: 'postalCode'
}, {
  title: 'Default',
  type: 'checkbox',
  dataIndex: 'isDefault'
}, {
  title: 'Actions',
  dataIndex: 'action',
  key: 'action',
  render: () => (
    <p>Some jsx</p>
  )
}];

describe('columns', () => {
  const props = {
    handleEdit: jest.fn(),
    handleDelete: jest.fn()
  };

  it('renders the columns component', () => {
    const component = shallow(<columns { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of columns', () => {
    const component = shallow(<columns { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('capturing columns array', () => {
    expect(JSON.stringify(columns(props.handleEdit, props.handleDelete))).toEqual(JSON.stringify(arrayToCompare));
  });
});
