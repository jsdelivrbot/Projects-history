import InfoCard from 'containers/Sales/Promotions/Single/Cards/InfoCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('InfoCard', () => {
  const props = {
    isNewPromotion: false
  };

  it('renders the InfoCard component', () => {
    const component = shallow(<InfoCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of InfoCard', () => {
    const component = shallow(<InfoCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
