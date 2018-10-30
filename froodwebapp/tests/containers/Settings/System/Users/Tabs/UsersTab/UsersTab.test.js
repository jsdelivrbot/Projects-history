import { UsersTab } from 'containers/Settings/System/Users/Tabs/UsersTab/UsersTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('UsersTab', () => {
  const props = {
    loadingPage: false,
    needReloadUsers: false,
    users: [],
    roles: [],
    usersGetRequest: jest.fn(),
    usersSaveRequest: jest.fn(),
    usersUpdateRequest: jest.fn(),
    usersDeleteRequest: jest.fn()
  };

  it('renders the UsersTab component', () => {
    const component = shallow(<UsersTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of UsersTab', () => {
    const component = shallow(<UsersTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
