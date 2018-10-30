import DetailsCard from 'containers/Sales/Promotions/Single/Cards/DetailsCard';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('DetailsCard', () => {
  const props = {
    selectValues: [],
    type: 1,
    condition: 1,
    selectedSku: 'sku',
    setMinPurchage: jest.fn(),
    handleFormatter: jest.fn(),
    handleParser: jest.fn(),
    handleToggleModal: jest.fn(),
    hasMinPurchase: false,
    constants: {}
  };

  it('renders the DetailsCard component', () => {
    const component = shallow(<DetailsCard { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of DetailsCard', () => {
    const component = shallow(<DetailsCard { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
