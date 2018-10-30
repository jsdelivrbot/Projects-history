import React from 'react';
import FormAddressInfo from 'components/ReduxFormFields/FormAddress/FormAddressInfo';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormAddressInfo', () => {
  it('captures snapshot of FormAddressInfo', () => {
    const props = {
      input: {
        value: 'Some value'
      }
    };
    const snappedComponent = shallow(<FormAddressInfo { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
