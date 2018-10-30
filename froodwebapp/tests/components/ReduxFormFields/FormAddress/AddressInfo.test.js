import React from 'react';
import AddressInfo from 'components/ReduxFormFields/FormAddress/AddressInfo';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('AddressInfo', () => {
  it('captures snapshot of AddressInfo', () => {
    const props = {
      user: {
        address: {
          address1: 'address1',
          address2: 'address2',
          cityName: 'LA',
          countryName: 'USA',
          id: '1'
        },
        name: ''
      },
      addressClick: jest.fn(),
      editIconVisible: false,
      editIconClick: jest.fn()
    };
    const snappedComponent = shallow(<AddressInfo { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
