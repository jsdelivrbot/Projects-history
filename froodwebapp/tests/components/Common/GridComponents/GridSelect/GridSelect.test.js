import React from 'react';
import { GridSelect } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridSelect', () => {
  it('captures snapshot of GridSelect', () => {
    const props = {
      handleChange: jest.fn(),
      value: 1
    };
    const snappedComponent = renderer.create(<GridSelect { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
