import React from 'react';
import { SkuAutoComplete } from 'components/Common/AutoComplete/SkuAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('SkuAutoComplete', () => {
  it('captures snapshot of SkuAutoComplete', () => {
    const props = {
      loadingAutoComplete: false,
      value: 'value',
      vendorId: 1,
      skus: [],
      alignRight: false,
      disabled: false,
      inputStyle: {},
      skuSearchRequest: jest.fn(),
      skuSearchByVendorRequest: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn()
    };

    const snappedComponent = shallow(<SkuAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
