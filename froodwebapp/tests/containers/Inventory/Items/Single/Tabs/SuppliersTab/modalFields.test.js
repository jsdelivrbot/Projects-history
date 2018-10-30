import { modalFields } from 'containers/Inventory/Items/Single/Tabs/SuppliersTab/modalFields';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('modalFields', () => {
  it('renders the modalFields component', () => {
    const component = shallow(<modalFields />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of modalFields', () => {
    const component = shallow(<modalFields />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
