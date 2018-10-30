import { Items } from 'containers/Inventory/Items/All/Items';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Items', () => {
  it('renders the Items component', () => {
    const component = shallow(<Items />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Items', () => {
    const component = shallow(<Items />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
