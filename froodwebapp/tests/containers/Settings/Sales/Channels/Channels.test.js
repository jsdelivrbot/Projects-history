import { Channels } from 'containers/Settings/Sales/Channels/Channels';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Channels', () => {
  const props = {
    loadingPage: false,
    channels: [],
    channelsGetRequest: jest.fn()
  };

  it('renders the Channels component', () => {
    const component = shallow(<Channels { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Channels', () => {
    const component = shallow(<Channels { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
