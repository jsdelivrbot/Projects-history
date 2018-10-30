import OrderCommonData from 'containers/Purchase/Orders/Single/Sections/OrderInfo/OrderCommonData/OrderCommonData';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderCommonData', () => {
  const props = {
    shippingMethods: [],
    payterms: [],
    contactUsers: [],
    status: 'status',
    isNewOrder: false,
    readonly: false,
    canBeEditedUntilPick: false,
    statusColor: 'status',
    disabled: false
  };

  it('renders the OrderCommonData component', () => {
    const component = shallow(<OrderCommonData { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrderCommonData', () => {
    const component = shallow(<OrderCommonData { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
