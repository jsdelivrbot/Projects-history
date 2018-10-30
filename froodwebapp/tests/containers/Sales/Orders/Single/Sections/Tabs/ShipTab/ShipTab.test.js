import { ShipTab } from 'containers/Sales/Orders/Single/Sections/Tabs/ShipTab/ShipTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ShipTab', () => {
  const props = {
    data: [],
    orderNo: '1'
  };

  it('renders the ShipTab component', () => {
    const component = shallow(<ShipTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ShipTab', () => {
    const component = shallow(<ShipTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
