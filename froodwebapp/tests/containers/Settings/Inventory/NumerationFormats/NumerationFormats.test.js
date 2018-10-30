import { NumerationFormatsPage } from 'containers/Settings/Inventory/NumerationFormats/NumerationFormats';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('NumerationFormatsPage', () => {
  const props = {
    numericSaveRequest: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the NumerationFormatsPage component', () => {
    const component = shallow(<NumerationFormatsPage { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of NumerationFormatsPage', () => {
    const component = shallow(<NumerationFormatsPage { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
