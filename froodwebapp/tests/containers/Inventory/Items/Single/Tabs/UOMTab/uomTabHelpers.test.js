import { uomTabHelpers } from 'containers/Inventory/Items/Single/Tabs/UOMTab/uomTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('uomTabHelpers', () => {
  const props = {
    handleEdit: jest.fn(),
    handleDeactivate: jest.fn()
  };

  it('renders the uomTabHelpers component', () => {
    const component = shallow(<uomTabHelpers { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of uomTabHelpers', () => {
    const component = shallow(<uomTabHelpers { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
