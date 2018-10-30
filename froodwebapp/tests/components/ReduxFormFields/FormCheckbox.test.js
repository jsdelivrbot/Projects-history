import React from 'react';
import { FormCheckbox } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormCheckbox', () => {
  it('captures snapshot of FormCheckBox', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn(),
      },
      text: 'Checked'
    };
    const snappedComponent = renderer.create(<FormCheckbox { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });

  it('captures snapshot of FormCheckBox without checkbox', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      }
    };
    const snappedComponent = renderer.create(<FormCheckbox { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
