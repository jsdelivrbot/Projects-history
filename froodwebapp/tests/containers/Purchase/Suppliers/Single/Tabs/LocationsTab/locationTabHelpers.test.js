import locationTabHelpers from 'containers/Purchase/Suppliers/Single/Tabs/LocationsTab/locationTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('locationTabHelpers', () => {
  const props = {
    handleActivate: jest.fn(),
    handleDeactivate: jest.fn()
  };

  it('renders the locationTabHelpers component', () => {
    const component = shallow(<locationTabHelpers { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of locationTabHelpers', () => {
    const component = shallow(<locationTabHelpers { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
