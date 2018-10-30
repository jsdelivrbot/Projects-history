import { FulfilmentItem } from 'containers/Settings/Sales/Fulfilment/Single/FulfilmentItem';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('FulfilmentItem', () => {
  const props = {
    match: {
      params: {
        item: 'item'
      }
    },
    location: {
      state: {
        readonly: false
      }
    },
    fulfilmentItemGetRequest: jest.fn()
  };

  it('renders the FulfilmentItem component', () => {
    const component = shallow(<FulfilmentItem { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of FulfilmentItem', () => {
    const component = shallow(<FulfilmentItem { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
