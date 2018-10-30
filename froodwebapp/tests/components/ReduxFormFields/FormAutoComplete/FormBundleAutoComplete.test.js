import React from 'react';
import { FormBundleAutoComplete } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormBundleAutoComplete', () => {
  it('captures snapshot of FormBundleAutoComplete', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      alignRight: false,
      disabled: false,
      filterByLocationId: 1
    };
    const snappedComponent = shallow(<FormBundleAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
