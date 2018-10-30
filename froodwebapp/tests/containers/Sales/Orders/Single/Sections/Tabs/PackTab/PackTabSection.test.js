import { PackTabSection } from 'containers/Sales/Orders/Single/Sections/Tabs/PackTab/PackTabSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PackTabSection', () => {
  const props = {
    data: {
      list: []
    },
    orderUpdatePackData: jest.fn(),
    orderNo: '1'
  };

  it('renders the PackTabSection component', () => {
    const component = shallow(<PackTabSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PackTabSection', () => {
    const component = shallow(<PackTabSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
