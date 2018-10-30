import ValidityCard from 'containers/Sales/Promotions/Single/Cards/ValidityCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ValidityCard', () => {
  const props = {
    requireEndDate: false,
    setNoEndDate: jest.fn()
  };

  it('renders the ValidityCard component', () => {
    const component = shallow(<ValidityCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ValidityCard', () => {
    const component = shallow(<ValidityCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
