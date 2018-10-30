import { AssemblyForm } from 'containers/Inventory/Bundles/Single/Tabs/AssemblyTab/AssemblyForm';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AssemblyForm', () => {
  const props = {
    loadingPage: false,
    bundleId: '1',
    handleSubmit: jest.fn(),
    bundleAssembliesUpdateRequest: jest.fn(),
    initialValues: {
      id: 1,
      assembledQty: 10,
      maxBundleQty: 25,
    }
  };
  it('renders the AssemblyForm component', () => {
    const component = shallow(<AssemblyForm { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AssemblyForm', () => {
    const component = shallow(<AssemblyForm { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls bundleAssembliesUpdateRequest in handleUpdate with correct param', () => {
    const values = {
      assembledQty: 14,
      disassembledQty: 24
    }
    const component = shallow(<AssemblyForm { ...props } />);
    component.instance().handleUpdate(values);

    expect(props.bundleAssembliesUpdateRequest.mock.calls.length).toBe(1);

    expect(props.bundleAssembliesUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.bundleId,
      payload: {
        qty: 24,
        operation: 'disassemble'
      }
    });
  });
});
