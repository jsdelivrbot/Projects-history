import { PackTab } from 'containers/Sales/Orders/Single/Sections/Tabs/PackTab/PackTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PackTab', () => {
  const props = {
    data: [],
    orderNo: '1'
  };

  it('renders the PackTab component', () => {
    const component = shallow(<PackTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PackTab', () => {
    const component = shallow(<PackTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
