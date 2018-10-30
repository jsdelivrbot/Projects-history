import { Supplier } from 'containers/Purchase/Suppliers/Single/Supplier';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Supplier', () => {
  const props = {
    match: {
      params: {
        id: 1
      }
    },
    location: {
      state: 'state'
    }
  };

  it('renders the Supplier component', () => {
    const component = shallow(<Supplier { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Supplier', () => {
    const component = shallow(<Supplier { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
