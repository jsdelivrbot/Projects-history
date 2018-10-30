import { Locations } from 'containers/Settings/System/Locations/Locations';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Locations', () => {
  const props = {
    locationsGetRequest: jest.fn()
  };

  it('renders the Locations component', () => {
    const component = shallow(<Locations { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Locations', () => {
    const component = shallow(<Locations { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls locationsGetRequest in handleTabClick when activeTab is locations', () => {
    const activeTab = 'locations';
    const component = shallow(<Locations { ...props } />);
    props.locationsGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.locationsGetRequest.mock.calls.length).toBe(1);
  });
});
