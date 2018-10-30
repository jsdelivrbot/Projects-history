import RedemptionCard from 'containers/Sales/Promotions/Single/Cards/RedemptionCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('RedemptionCard', () => {
  const props = {
    isLimited: false
  };

  it('renders the RedemptionCard component', () => {
    const component = shallow(<RedemptionCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of RedemptionCard', () => {
    const component = shallow(<RedemptionCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
