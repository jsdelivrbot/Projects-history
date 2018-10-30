import { LoginPage } from 'containers/Common/LoginPage/LoginPage';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('LoginPage', () => {
  const props = {
    user: {},
    push: jest.fn(),
    loginRequest: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('renders the LoginPage component', () => {
    const component = shallow(<LoginPage { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of LoginPage', () => {
    const component = shallow(<LoginPage { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls loginRequest function in handleLogin function with correct param', () => {
    const user = {
      email: 'testuser28@gmail.com',
      password: '1234567'
    };
    const component = shallow(<LoginPage { ...props } />);
    component.instance().handleLogin(user);

    expect(props.loginRequest.mock.calls.length).toBe(1);

    expect(props.loginRequest.mock.calls[0][0]).toBe(user.email, user.password);
  });
});
