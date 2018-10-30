import OrderTypesCard from 'containers/Sales/Promotions/Single/Cards/OrderTypesCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderTypesCard', () => {
  const props = {
    selectValues: [],
    type: 1,
    condition: 1
  };

  it('renders the OrderTypesCard component', () => {
    const component = shallow(<OrderTypesCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrderTypesCard', () => {
    const component = shallow(<OrderTypesCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
