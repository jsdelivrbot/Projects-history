import { Orders } from 'containers/Sales/Customers/All/Customers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Customers', () => {
  it('renders the Orders component', () => {
    const component = shallow(<Orders />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Orders', () => {
    const component = shallow(<Orders />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
