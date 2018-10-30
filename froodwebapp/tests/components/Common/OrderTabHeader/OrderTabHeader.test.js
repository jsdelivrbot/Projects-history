import React from 'react';
import { OrderTabHeader } from 'components';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('OrderTabHeader', () => {
  it('captures snapshot of OrderTabHeader', () => {
    const props = {
      header: 'header',
      headerLabel: 'label',
      primaryButtonText: 'text',
      secondaryButtonText: 'text',
    };
    const snappedComponent = shallow(
      <OrderTabHeader { ...props }>
        <h1>Test checking</h1>
      </OrderTabHeader>);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('checks for OrderTabHeader`s children', () => {
    const props = {
      id: 1,
      onClick: jest.fn()
    };
    const snappedComponent = mount(
      <OrderTabHeader { ...props }>
        <h1>Test checking</h1>
      </OrderTabHeader>
    );
    expect(snappedComponent.props().children.type).toBe('h1');
  });
});
