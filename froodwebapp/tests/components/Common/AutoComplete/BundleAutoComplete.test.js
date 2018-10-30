import React from 'react';
import { BundleAutoComplete } from 'components/Common/AutoComplete/BundleAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('BundleAutoComplete', () => {
  it('captures snapshot of BundleAutoComplete', () => {
    const props = {
      loadingAutoComplete: false,
      value: 'value',
      bundles: [],
      alignRight: false,
      disabled: false,
      bundleSearchRequest: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn()
    };

    const snappedComponent = shallow(<BundleAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
