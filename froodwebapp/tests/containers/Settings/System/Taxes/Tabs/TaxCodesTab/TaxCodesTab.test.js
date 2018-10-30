import { TaxCodesTab } from 'containers/Settings/System/Taxes/Tabs/TaxCodesTab/TaxCodesTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TaxCodesTab', () => {
  const props = {
    loadingPage: false,
    needReloadTaxCodes: false,
    taxCodes: [],
    taxCodesGetRequest: jest.fn(),
    taxCodesSaveRequest: jest.fn(),
    taxCodesUpdateRequest: jest.fn(),
    taxCodesDeleteRequest: jest.fn()
  };

  it('renders the TaxCodesTab component', () => {
    const component = shallow(<TaxCodesTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TaxCodesTab', () => {
    const component = shallow(<TaxCodesTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
