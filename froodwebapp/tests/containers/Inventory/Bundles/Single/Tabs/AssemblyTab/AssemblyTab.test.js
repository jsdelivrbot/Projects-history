import { AssemblyTab } from 'containers/Inventory/Bundles/Single/Tabs/AssemblyTab/AssemblyTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AssemblyTab', () => {
  const props = {
    loadingPage: false,
    needReloadAssemblies: false,
    bundleId: '1',
    bundleAssembliesDetails: [],
    bundleAssembliesGetRequest: jest.fn()
  };
  it('renders the AssemblyTab component', () => {
    const component = shallow(<AssemblyTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AssemblyTab', () => {
    const component = shallow(<AssemblyTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
