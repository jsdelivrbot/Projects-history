import { AllocationsTab } from 'containers/Sales/Orders/Single/Sections/Tabs/AllocationsTab/AllocationsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ActivityTab', () => {
  const props = {
    orderNo: '1',
    data: {},
    orderUpdateAllocationData: jest.fn()
  };

  it('renders the AllocationsTab component', () => {
    const component = shallow(<AllocationsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AllocationsTab', () => {
    const component = shallow(<AllocationsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
