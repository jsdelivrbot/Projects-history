import { StockCounts } from 'containers/Inventory/StockCount/All/StockCounts';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StockCounts', () => {
  it('renders the StockCounts component', () => {
    const component = shallow(<StockCounts />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of StockCounts', () => {
    const component = shallow(<StockCounts />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
