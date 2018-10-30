import { POTabs } from 'containers/Purchase/Orders/Single/Sections/Tabs/Tabs';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('POTabs', () => {
  const props = {
    shippingCharge: 1,
    customerCredit: 'credit',
    orderId: '1',
    readonly: false,
    isNewOrder: false,
    status: 'status',
    onUpdate: jest.fn()
  };

  it('renders the POTabs component', () => {
    const component = shallow(<POTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of POTabs', () => {
    const component = shallow(<POTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
