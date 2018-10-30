import {
  productOptionsColumns,
  productVariantsNewColumns,
  productVariantsEditColumns
} from 'containers/Inventory/Items/Single/Tabs/MainTab/productVariantsColumns';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('productVariantsColumns', () => {
  const props = {
    productKeyColumnDisabled: true
  };

  it('renders the productOptionsColumns component', () => {
    const component = shallow(<productOptionsColumns { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of productOptionsColumns', () => {
    const component = shallow(<productOptionsColumns { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('renders the productVariantsNewColumns component', () => {
    const component = shallow(<productVariantsNewColumns { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of productVariantsNewColumns', () => {
    const component = shallow(<productVariantsNewColumns { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('renders the productVariantsEditColumns component', () => {
    const component = shallow(<productVariantsEditColumns { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of productVariantsEditColumns', () => {
    const component = shallow(<productVariantsEditColumns { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
