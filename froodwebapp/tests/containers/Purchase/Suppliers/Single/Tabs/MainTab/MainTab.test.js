import { MainTab } from 'containers/Purchase/Suppliers/Single/Tabs/MainTab/MainTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('MainTab', () => {
  const props = {
    loadingPage: false,
    supplierCreated: false,
    countries: [],
    payterms: [],
    supplierId: '1',
    isNewSupplier: false,
    push: jest.fn(),
    supplierSaveRequest: jest.fn(),
    supplierUpdateRequest: jest.fn(),
    handleSubmit: jest.fn(),
    initialValues: {}
  };

  it('renders the MainTab component', () => {
    const component = shallow(<MainTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of MainTab', () => {
    const component = shallow(<MainTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
