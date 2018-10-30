import React from 'react';
import { FormSelect } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormSelect', () => {
  it('captures snapshot of FormSelect', () => {
    const props = {
      input: {
        value: 'properties',
        onChange: jest.fn()
      },
      menuItems: [{
        key: 1,
        value: 'value1'
      }, {
        key: 2,
        value: 'value2'
      }],
      disabled: true,
      placeholder: 'Enter value'
    };
    const snappedComponent = renderer.create(<FormSelect { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
