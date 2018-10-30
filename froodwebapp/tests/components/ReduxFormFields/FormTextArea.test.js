import React from 'react';
import { FormTextArea } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormTextArea', () => {
  it('captures snapshot of FormTextArea', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      type: 'type',
      style: {},
      className: 'btn',
      placeholder: 'placeholder',
      disabled: false
    };
    const snappedComponent = shallow(<FormTextArea { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
