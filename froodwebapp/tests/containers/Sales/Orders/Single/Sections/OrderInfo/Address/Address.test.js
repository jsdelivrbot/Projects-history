import { Address } from 'containers/Sales/Orders/Single/Sections/OrderInfo/Address/Address';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('CustomerProfile', () => {
  const props = {
    disabled: false,
    push: jest.fn(),
    customerAddresses: [],
    customer: {
      id: '1',
      name: 'name'
    },
    customerAddressGetRequest: jest.fn()
  };

  it('renders the Address component', () => {
    const component = shallow(<Address { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Address', () => {
    const component = shallow(<Address { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
