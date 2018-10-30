import React from 'react';
import { Button } from 'components/Common';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('Button', () => {
  it('captures snapshot of Button', () => {
    const props = {
      id: 1,
      onClick: jest.fn()
    };
    const snappedComponent = shallow(
      <Button { ...props } >
        <h1>Test checking</h1>
      </Button>
    );

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('checks for Button`s children', () => {
    const props = {
      id: 1,
      onClick: jest.fn()
    };
    const snappedComponent = mount(
      <Button { ...props }>
        <h1>Test checking</h1>
      </Button>
    );
    expect(snappedComponent.props().children.type).toBe('h1');
  });
});
