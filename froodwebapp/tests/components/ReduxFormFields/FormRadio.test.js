import React from 'react';
import { FormRadio } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormRadio', () => {
  it('captures snapshot of FormRadio', () => {
    const props = {
      input: {
        checked: true,
        onChange: jest.fn()
      }
    };
    const snappedComponent = renderer.create(<FormRadio { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
