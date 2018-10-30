import React from 'react';
import { Header } from 'components/Header/Header';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('Header', () => {
  it('captures snapshot of Header', () => {
    const props = {
      user: {
        id: '12',
        name: 'ERROR'
      },
      push: jest.fn(),
      commonDataLoaded: false,
      badgeNotificationsCount: 12,
      logoutRequest: jest.fn()
    };
    const snappedComponent = shallow(<Header { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
