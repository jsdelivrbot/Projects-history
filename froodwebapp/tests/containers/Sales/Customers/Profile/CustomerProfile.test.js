import { CustomerProfile } from 'containers/Sales/Customers/Profile/CustomerProfile';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('CustomerProfile', () => {
  const props = {
    match: {
      params: {
        id: '1'
      }
    },
    customerProfileGetRequest: jest.fn(),
    customerAddressGetRequest: jest.fn(),
    customerOrdersGetRequest: jest.fn(),
    location: {
      state: 'state'
    }
  };

  it('renders the CustomerProfile component', () => {
    const component = shallow(<CustomerProfile { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of CustomerProfile', () => {
    const component = shallow(<CustomerProfile { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
