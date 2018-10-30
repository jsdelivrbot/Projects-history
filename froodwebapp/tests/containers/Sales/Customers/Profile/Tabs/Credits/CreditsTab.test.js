import { CreditsTab } from 'containers/Sales/Customers/Profile/Tabs/Credits/CreditsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('CreditsTab', () => {
  const props = {
    loadingPage: false,
    credits: [],
    customerId: '1',
    customerName: 'name',
    customerCreditsGetRequest: jest.fn(),
    customerCreditsSaveRequest: jest.fn()
  };

  it('renders the CreditsTab component', () => {
    const component = shallow(<CreditsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of CreditsTab', () => {
    const component = shallow(<CreditsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
