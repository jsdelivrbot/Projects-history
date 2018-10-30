import { ChannelItem } from 'containers/Settings/Sales/Channels/ChannelItem';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ChannelItem', () => {
  const props = {
    loadingPage: false,
    channel: {
      isActive: false
    },
    channelsGetRequest: jest.fn()
  };

  it('renders the ChannelItem component', () => {
    const component = shallow(<ChannelItem { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ChannelItem', () => {
    const component = shallow(<ChannelItem { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
