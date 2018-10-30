import { ProfileTab } from 'containers/Sales/Customers/Profile/Tabs/ProfileTab/ProfileTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ProfileTab', () => {
  const props = {
    loadingPage: false,
    initialValues: {},
    customerId: '1',
    customerProfileGetRequest: jest.fn(),
    customerProfileUpdateRequest: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the ProfileTab component', () => {
    const component = shallow(<ProfileTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ProfileTab', () => {
    const component = shallow(<ProfileTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls customerProfileUpdateRequest in handleUpdateCustomerProfile with correct param', () => {
    const values = {
      id: '1',
      value: 'Some value',
      phone: {
        number: '+380 189321239',
        countryCode: '820'
      }
    };
    const component = shallow(<ProfileTab { ...props } />);
    component.instance().handleUpdateCustomerProfile(values);

    expect(props.customerProfileUpdateRequest.mock.calls.length).toBe(1);

    expect(props.customerProfileUpdateRequest.mock.calls[0][0]).toEqual({
      payload: {
        ...values,
        phone: values.phone.number,
        countryCode: values.phone.countryCode
      }
    });
  });
});
