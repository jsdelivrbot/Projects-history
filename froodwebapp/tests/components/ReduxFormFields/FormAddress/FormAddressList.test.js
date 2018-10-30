import React from 'react';
import FormAddressList from 'components/ReduxFormFields/FormAddress/FormAddressList';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormAddressList', () => {
  it('captures snapshot of FormAddressList', () => {
    const props = {
      input: {
        value: 'Some value',
        onChange: jest.fn()
      },
      allAddresses: [{
        address: {
          id: '1'
        }
      }],
      handleAddressRedirect: jest.fn()
    };
    const snappedComponent = shallow(<FormAddressList { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
