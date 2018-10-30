import { OrderInfo } from 'containers/Purchase/Orders/Single/Sections/OrderInfo/OrderInfo';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderInfo', () => {
  const props = {
    contactUsers: [],
    payterms: [],
    shippingMethods: [],
    status: 'status',
    isNewOrder: false,
    readonly: false,
    staticData: {},
    disabled: false
  };

  it('renders the OrderInfo component', () => {
    const component = shallow(<OrderInfo { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrderInfo', () => {
    const component = shallow(<OrderInfo { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
