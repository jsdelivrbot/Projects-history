import React from 'react';
import { FormGridTable } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormDatePicker', () => {
  it('captures snapshot of FormDatePicker', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      }
    };
    const snappedComponent = shallow(<FormGridTable { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
