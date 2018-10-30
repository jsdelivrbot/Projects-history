import { AllSuppliers } from 'containers/Purchase/Suppliers/All/Suppliers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AllSuppliers', () => {
  it('renders the AllSuppliers component', () => {
    const component = shallow(<AllSuppliers />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AllSuppliers', () => {
    const component = shallow(<AllSuppliers />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
