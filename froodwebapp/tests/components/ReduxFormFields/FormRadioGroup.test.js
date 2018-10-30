import React from 'react';
import { FormRadioGroup } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormRadioGroup', () => {
  it('captures snapshot of FormRadioGroup', () => {
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
      className: 'radio-btn'
    };
    const snappedComponent = renderer.create(<FormRadioGroup { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
