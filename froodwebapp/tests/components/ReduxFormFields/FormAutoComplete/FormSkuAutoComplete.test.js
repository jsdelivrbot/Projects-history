import React from 'react';
import FormSkuAutoComplete from 'components/ReduxFormFields/FormAutoComplete/FormSkuAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormAutoComplete', () => {
  it('captures snapshot of FormAutoComplete', () => {
    const props = {
      input: {
        onChange: jest.fn(),
        value: 'Some value'
      },
      alignRight: false,
      disabled: false
    };
    const snappedComponent = shallow(<FormSkuAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
