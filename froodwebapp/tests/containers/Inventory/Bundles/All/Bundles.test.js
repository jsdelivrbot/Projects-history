import { Bundles } from 'containers/Inventory/Bundles/All/Bundles';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Bundles', () => {
  it('renders the Bundles component', () => {
    const component = shallow(<Bundles />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Bundles', () => {
    const component = shallow(<Bundles />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
