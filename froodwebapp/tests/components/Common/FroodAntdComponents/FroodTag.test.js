import React from 'react';
import FroodTag from 'components/Common/FroodAntdComponents/FroodTag';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FroodTag', () => {
  it('captures snapshot of FroodTag', () => {
    const props = {
      id: 1,
      tag: {
        value: ' some value'
      }
    };
    const snappedComponent = shallow(<FroodTag { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
