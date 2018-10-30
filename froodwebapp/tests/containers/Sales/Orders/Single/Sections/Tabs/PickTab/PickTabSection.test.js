import { PickTabSection } from 'containers/Sales/Orders/Single/Sections/Tabs/PickTab/PickTabSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PickTabSection', () => {
  const props = {
    data: {
      list: [{
        isPicked: false
      }]
    },
    orderUpdatePickData: jest.fn(),
    orderNo: '1'
  };

  it('renders the PickTabSection component', () => {
    const component = shallow(<PickTabSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PickTabSection', () => {
    const component = shallow(<PickTabSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
