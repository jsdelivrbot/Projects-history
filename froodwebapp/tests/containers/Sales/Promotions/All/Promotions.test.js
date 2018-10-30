import { Promotions } from 'containers/Sales/Promotions/All/Promotions';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Promotions', () => {
  it('renders the Promotions component', () => {
    const component = shallow(<Promotions />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Promotions', () => {
    const component = shallow(<Promotions />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
