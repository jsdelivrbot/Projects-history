import React from 'react';
import { FormTimePicker } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormTimePicker', () => {
  it('captures snapshot of FormTimePicker', () => {
    const props = {
      input: {
        value: 'properties'
      },
      disabled: true,
      timeFormat: 'H:mm:ss'
    };
    const snappedComponent = renderer.create(<FormTimePicker { ...props } />).toJSON();
    expect(snappedComponent).toMatchSnapshot();
  });
});
