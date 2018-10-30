import StatisticsSection from 'containers/Common/MainContainer/MainContainerSections/StatisticsSection/StatisticsSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StatisticsSection', () => {
  const props = {
    stats: [{
      isDynamic: false,
      dollarSign: true,
      value: '12',
      description: 'Some description'
    }, {
      isDynamic: true,
      dollarSign: true,
      value: '12',
      description: 'Some description'
    }]
  };

  it('renders the StatisticsSection component', () => {
    const component = shallow(<StatisticsSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of StatisticsSection', () => {
    const component = shallow(<StatisticsSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
