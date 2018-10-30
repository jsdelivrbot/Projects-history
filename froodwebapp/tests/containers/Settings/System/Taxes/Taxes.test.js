import { Taxes } from 'containers/Settings/System/Taxes/Taxes';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Taxes', () => {
  const props = {
    taxCategoriesGetRequest: jest.fn(),
    taxCodesGetRequest: jest.fn()
  };

  it('renders the Taxes component', () => {
    const component = shallow(<Taxes { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Taxes', () => {
    const component = shallow(<Taxes { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
