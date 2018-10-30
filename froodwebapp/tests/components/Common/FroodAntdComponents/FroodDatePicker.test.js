import React from 'react';
import { FroodDatePicker } from 'components/Common/';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';

const { describe, it, expect } = global;

describe('FroodDatePicker', () => {
  it('captures snapshot of FroodDatePicker', () => {
    MockDate.set(1434319925275);
    const props = {
      id: '1',
      columnName: 'big',
      value: 'some value',
      onChange: jest.fn()
    };
    const snappedComponent = renderer.create(<FroodDatePicker { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
    MockDate.reset();
  });
});
