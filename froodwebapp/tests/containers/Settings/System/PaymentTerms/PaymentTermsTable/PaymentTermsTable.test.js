import { PaymentTermsTable } from 'containers/Settings/System/PaymentTerms/PaymentTermsTable/PaymentTermsTable';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PaymentTermsTable', () => {
  const props = {
    loadingPage: false,
    needReloadPayTerms: false,
    paymentTerms: [],
    fromFields: [],
    payTermsGetRequest: jest.fn(),
    payTermsSaveRequest: jest.fn(),
    payTermsUpdateRequest: jest.fn(),
    payTermsDeleteRequest: jest.fn()
  };

  it('renders the PaymentTermsTable component', () => {
    const component = shallow(<PaymentTermsTable { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PaymentTermsTable', () => {
    const component = shallow(<PaymentTermsTable { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
