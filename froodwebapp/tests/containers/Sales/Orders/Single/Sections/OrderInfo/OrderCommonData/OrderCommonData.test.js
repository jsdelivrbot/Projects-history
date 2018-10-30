import { OrderCommonData } from 'containers/Sales/Orders/Single/Sections/OrderInfo/OrderCommonData/OrderCommonData';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderCommonData', () => {
  const props = {
    payterms: [],
    slots: [],
    deliveryMethods: [{
      id: 1,
      slots: [{
        id: 'id',
        name: 'name'
      }]
    }],
    status: 'status',
    deliveryMethodId: 1,
    disabled: false,
    deliveryMethodInfo: {
      calLeadDays: 'lead',
      calVisibleDays: 'visible'
    },
    deliverySlotsInfo: [],
    defaultCustomerAddress: {},
    channelId: '1',
    deliveryDate: 'date',
    customerName: 'name',
    onFieldChange: jest.fn(),
    deliveryInfoParallelRequest: jest.fn(),
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
