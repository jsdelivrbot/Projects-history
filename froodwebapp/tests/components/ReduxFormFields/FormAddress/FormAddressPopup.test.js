import React from 'react';
import FormAddressPopup from 'components/ReduxFormFields/FormAddress/FormAddressPopup';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormAddressPopup', () => {
  it('captures snapshot of FormAddressPopup', () => {
    const props = {
      title: 'title',
      disabled: false,
      allAddresses: [],
      input: {
        value: 'value'
      },
      handleAddressRedirect: jest.fn()
    };
    const snappedComponent = shallow(<FormAddressPopup { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
