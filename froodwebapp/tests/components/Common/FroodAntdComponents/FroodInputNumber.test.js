import React from 'react';
import { FroodInputNumber } from 'components/Common';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FroodInputNumber', () => {
  it('captures snapshot of FroodInputNumber', () => {
    const props = {
      id: 1,
      disabled: false,
      max: 8,
      min: 2,
      defaultValue: 3,
      onChange: jest.fn()
    };
    const snappedComponent = shallow(<FroodInputNumber { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
