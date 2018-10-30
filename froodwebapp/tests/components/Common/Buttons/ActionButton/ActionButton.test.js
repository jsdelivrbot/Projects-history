import React from 'react';
import { ActionButton } from 'components/Common';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('ActionButton', () => {
  it('captures snapshot of ActionButton', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = shallow(<ActionButton { ...props }>
      <h1>Test checking</h1>
    </ActionButton>);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('checks for ActionButton`s children', () => {
    const props = {
      id: 1,
      onClick: jest.fn()
    };
    const snappedComponent = mount(
      <ActionButton { ...props }>
        <h1>Test checking</h1>
      </ActionButton>
    );
    expect(snappedComponent.props().children.type).toBe('h1');
  });
});
