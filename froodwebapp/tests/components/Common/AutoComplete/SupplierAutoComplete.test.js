import React from 'react';
import { SupplierAutoComplete } from 'components/Common/AutoComplete/SupplierAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('SupplierAutoComplete', () => {
  it('captures snapshot of SupplierAutoComplete', () => {
    const props = {
      loadingAutoComplete: false,
      value: 'value',
      suppliers: [],
      alignRight: false,
      disabled: false,
      supplierSearchRequest: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn()
    };

    const snappedComponent = shallow(<SupplierAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
