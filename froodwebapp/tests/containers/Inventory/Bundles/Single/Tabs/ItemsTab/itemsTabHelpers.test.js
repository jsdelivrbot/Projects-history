import itemsTabHelpers from 'containers/Inventory/Bundles/Single/Tabs/ItemsTab/itemsTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('itemsTabHelpers', () => {
  const props = {
    handleEdit: jest.fn(),
    handleDeactivate: jest.fn()
  };

  it('renders the itemsTabHelpers component', () => {
    const component = shallow(<itemsTabHelpers { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of itemsTabHelpers', () => {
    const component = shallow(<itemsTabHelpers { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
