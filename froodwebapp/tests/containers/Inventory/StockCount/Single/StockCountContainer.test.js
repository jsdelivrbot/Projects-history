import { StockCountContainer } from 'containers/Inventory/StockCount/Single/StockCountContainer';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StockCountContainer', () => {
  const props = {
    match: {
      params: {
        id: 1
      }
    }
  };

  it('renders the StockCountContainer component', () => {
    const component = shallow(<StockCountContainer { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of StockCountContainer', () => {
    const component = shallow(<StockCountContainer { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
