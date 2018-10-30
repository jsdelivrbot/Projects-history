import React from 'react';
import { FroodSearchInput } from 'components/Common/';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FroodSearchInput', () => {
  it('captures snapshot of FroodSearchInput', () => {
    const props = {
      onChange: jest.fn()
    };
    const snappedComponent = renderer.create(<FroodSearchInput { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
