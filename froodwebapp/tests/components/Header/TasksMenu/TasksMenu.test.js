import React from 'react';
import { TasksMenu } from 'components/Header/TasksMenu/TasksMenu';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('TasksMenu', () => {
  it('captures snapshot of TasksMenu', () => {
    const props = {
      warningNotifications: [{
        id: '12',
        msg: 'ERROR'
      }, {
        id: '13',
        msg: 'SUCCESS'
      }],
      handleMenuOpen: jest.fn(),
      removeWarningNotification: jest.fn()
    };
    const snappedComponent = shallow(<TasksMenu { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
