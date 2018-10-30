import { NewCategory } from 'containers/Settings/Inventory/ProductCategories/NewCategory';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('NewCategory', () => {
  const props = {
    pristine: false,
    prodCatSaveRequest: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the NewCategory component', () => {
    const component = shallow(<NewCategory { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of NewCategory', () => {
    const component = shallow(<NewCategory { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
