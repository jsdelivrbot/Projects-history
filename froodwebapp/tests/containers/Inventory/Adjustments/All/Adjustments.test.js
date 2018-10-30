import { Adjustments } from 'containers/Inventory/Adjustments/All/Adjustments';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Adjustments', () => {
  it('renders the Adjustments component', () => {
    const component = shallow(<Adjustments />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Adjustments', () => {
    const component = shallow(<Adjustments />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
