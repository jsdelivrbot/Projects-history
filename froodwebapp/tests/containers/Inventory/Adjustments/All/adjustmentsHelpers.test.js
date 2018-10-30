import { adjustmentsHelpers } from 'containers/Inventory/Adjustments/All/adjustmentsHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Adjustments', () => {
  it('renders the Adjustments component', () => {
    const component = shallow(<adjustmentsHelpers />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Adjustments', () => {
    const component = shallow(<adjustmentsHelpers />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
