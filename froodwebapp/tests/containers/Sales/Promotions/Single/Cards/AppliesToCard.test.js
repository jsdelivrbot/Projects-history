import AppliesToCard from 'containers/Sales/Promotions/Single/Cards/AppliesToCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AppliesToCard', () => {
  const props = {
    selectValues: [],
    categories: [],
    type: 1,
    condition: 1,
    handleToggleModal: jest.fn(),
    appliesToSelectedSku: 'sku',
    appliesToBundleSku: 'sku',
    constants: {}
  };

  it('renders the AppliesToCard component', () => {
    const component = shallow(<AppliesToCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AppliesToCard', () => {
    const component = shallow(<AppliesToCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
