import React from 'react';
import { FormRadioButtonGroup } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormRadioButtonGroup', () => {
  it('captures snapshot of FormRadioButtonGroup', () => {
    const props = {
      input: {
        checked: true,
        value: 'properties',
        onChange: jest.fn()
      },
      radioButtonValues: [{
        key: 1,
        value: 'value1',
        disabled: true
      }, {
        key: 2,
        value: 'value2',
        disabled: false
      }],
      className: 'radio-btn',
      disbaled: true
    };
    const snappedComponent = renderer.create(<FormRadioButtonGroup { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
