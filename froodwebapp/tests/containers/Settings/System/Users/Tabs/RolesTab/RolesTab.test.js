import { RolesTab } from 'containers/Settings/System/Users/Tabs/RolesTab/RolesTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('RolesTab', () => {
  const props = {
    loadingPage: false,
    needReloadRoles: false,
    roles: [],
    rolesGetRequest: jest.fn(),
    rolesSaveRequest: jest.fn(),
    rolesUpdateRequest: jest.fn(),
    rolesDeleteRequest: jest.fn(),
    handleTabClick: jest.fn()
  };

  it('renders the RolesTab component', () => {
    const component = shallow(<RolesTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of RolesTab', () => {
    const component = shallow(<RolesTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
