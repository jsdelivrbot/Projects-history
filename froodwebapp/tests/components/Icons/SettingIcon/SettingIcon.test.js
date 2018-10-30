import React from 'react';
import { SettingsIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('SettingIcon', () => {
  it('captures snapshot of SettingIcon', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<SettingsIcon { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
