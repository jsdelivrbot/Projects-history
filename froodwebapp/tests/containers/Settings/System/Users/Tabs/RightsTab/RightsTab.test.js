import { RightsTab } from 'containers/Settings/System/Users/Tabs/RightsTab/RightsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('RightsTab', () => {
  const props = {
    loadingPage: false,
    needReloadRights: false,
    roles: [],
    rights: [],
    rolesGetRequest: jest.fn(),
    rightsUpdateRequest: jest.fn(),
    activeRoleId: '1'
  };

  it('renders the RightsTab component', () => {
    const component = shallow(<RightsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of RightsTab', () => {
    const component = shallow(<RightsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
