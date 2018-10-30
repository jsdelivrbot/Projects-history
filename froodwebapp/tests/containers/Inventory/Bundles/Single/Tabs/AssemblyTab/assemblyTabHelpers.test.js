import assemblyTabHelpers from 'containers/Inventory/Bundles/Single/Tabs/AssemblyTab/assemblyTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('assemblyTabHelpers', () => {
  it('renders the assemblyTabHelpers component', () => {
    const component = shallow(<assemblyTabHelpers />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of assemblyTabHelpers', () => {
    const component = shallow(<assemblyTabHelpers />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
