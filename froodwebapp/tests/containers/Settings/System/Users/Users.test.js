import { Users } from 'containers/Settings/System/Users/Users';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Users', () => {
  const props = {
    usersGetRequest: jest.fn(),
    rolesGetRequest: jest.fn(),
    rightsGetRequest: jest.fn()
  };

  it('renders the Users component', () => {
    const component = shallow(<Users { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Users', () => {
    const component = shallow(<Users { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
