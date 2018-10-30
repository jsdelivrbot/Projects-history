import { Item } from 'containers/Inventory/Items/Single/Item';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Item', () => {
  const props = {
    match: {
      params: {
        id: 'Some id'
      }
    }
  };
  it('renders the Item component', () => {
    const component = shallow(<Item { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Item', () => {
    const component = shallow(<Item { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
