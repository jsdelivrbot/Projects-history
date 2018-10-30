import { PickTab } from 'containers/Sales/Orders/Single/Sections/Tabs/PickTab/PickTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PickTab', () => {
  const props = {
    data: [],
    orderNo: '1'
  };

  it('renders the PickTab component', () => {
    const component = shallow(<PickTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PickTab', () => {
    const component = shallow(<PickTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
