import { stockCountHelpers } from 'containers/Inventory/StockCount/Single/StockCount/stockCountHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('stockCountHelpers', () => {
  it('renders the stockCountHelpers component', () => {
    const component = shallow(<stockCountHelpers />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of stockCountHelpers', () => {
    const component = shallow(<stockCountHelpers />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
