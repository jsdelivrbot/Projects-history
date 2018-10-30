import { modalFields } from 'containers/Inventory/Bundles/Single/Tabs/ItemsTab/modalFields';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('modalFields', () => {
  const props = {
    handleEdit: jest.fn(),
    handleDeactivate: jest.fn()
  };

  it('renders the modalFields component', () => {
    const component = shallow(<modalFields { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of modalFields', () => {
    const component = shallow(<modalFields { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
