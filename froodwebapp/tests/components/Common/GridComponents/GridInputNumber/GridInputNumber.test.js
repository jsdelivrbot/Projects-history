import React from 'react';
import { GridInputNumber } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('GridInputNumber', () => {
  it('captures snapshot of GridInputNumber', () => {
    const props = {
      value: 1,
      index: 1,
      onChange: jest.fn(),
      propName: '',
      disabled: false,
      min: false,
      max: 1,
      formatter: jest.fn(),
      parser: jest.fn(),
      autoFocus: false
    };
    const snappedComponent = shallow(<GridInputNumber { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
