import { PriceListContainer } from 'containers/Settings/System/PriceLists/Single/PriceListContainer';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PriceListContainer', () => {
  const props = {
    match: {
      params: {
        id: '1'
      }
    }
  };

  it('renders the PriceListContainer component', () => {
    const component = shallow(<PriceListContainer { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PriceListContainer', () => {
    const component = shallow(<PriceListContainer { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
