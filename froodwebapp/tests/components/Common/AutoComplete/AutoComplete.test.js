import React from 'react';
import { AutoComplete } from 'components/Common';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('AutoComplete', () => {
  it('captures snapshot of AutoComplete with true loadingAutoComplete', () => {
    const props = {
      loadingAutoComplete: true,
      value: 'Some value',
      items: ['item1', 'item2'],
      text: 'single menu item',
      activeUrl: '/v1/categories/',
      handleRedirect: jest.fn(),
      getItemValue: jest.fn(),
      renderItem: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn(),
      disabled: false,
      inputRef: jest.fn(),
      inputStyle: {},
      inputPlaceholder: 'placeholder',
      alignRight: false,
      onBlur: jest.fn(),
      onFocus: jest.fn()
    };

    const snappedComponent = shallow(<AutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
