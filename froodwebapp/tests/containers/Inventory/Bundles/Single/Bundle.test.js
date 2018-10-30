import { Bundle } from 'containers/Inventory/Bundles/Single/Bundle';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Bundle', () => {
  const props = {
    match: {
      params: {
        id: 'some id'
      }
    }
  };
  it('renders the Bundle component', () => {
    const component = shallow(<Bundle { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Bundle', () => {
    const component = shallow(<Bundle { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
