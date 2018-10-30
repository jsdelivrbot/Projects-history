import { CoreLayout } from 'containers/Common/CoreLayout/CoreLayout';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('CoreLayout', () => {
  const props = {
    commonDataLoaded: false,
    dispatch: jest.fn(),
    location: {
      pathname: 'pathname',
      newPath: 'newPath'
    }
  };

  it('renders the CoreLayout component', () => {
    const component = shallow(<CoreLayout { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of CoreLayout', () => {
    const component = shallow(<CoreLayout { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
