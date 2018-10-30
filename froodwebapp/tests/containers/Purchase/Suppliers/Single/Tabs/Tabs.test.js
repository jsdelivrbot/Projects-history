import { PurchaseSupplierTabs } from 'containers/Purchase/Suppliers/Single/Tabs/Tabs';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PurchaseSupplierTabs', () => {
  const props = {
    supplierId: '1',
    isNewSupplier: false,
    supplierInfoGetRequest: jest.fn(),
    supplierLocationsGetRequest: jest.fn(),
    supplierNotesGetRequest: jest.fn(),
    supplierContactsGetRequest: jest.fn(),
    supplierOrdersGetRequest: jest.fn(),
    supplierPriceListGetRequest: jest.fn(),
    handleTabChange: jest.fn(),
    activeTab: 'tab',
    location: {
      state: 'state'
    }
  };

  it('renders the PurchaseSupplierTabs component', () => {
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PurchaseSupplierTabs', () => {
    const component = shallow(<PurchaseSupplierTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls supplierInfoGetRequest in handleTabClick with main activeTab', () => {
    const activeTab = 'main';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierInfoGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierInfoGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierInfoGetRequest.mock.calls[0][0]).toEqual({ id: props.supplierId });

    props.supplierInfoGetRequest.mock.calls.length = 0;
  });

  it('calls supplierInfoGetRequest in handleTabClick with locations activeTab', () => {
    const activeTab = 'locations';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierLocationsGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierLocationsGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierLocationsGetRequest.mock.calls[0][0]).toEqual({ id: props.supplierId });

    props.supplierLocationsGetRequest.mock.calls.length = 0;
  });

  it('calls supplierInfoGetRequest in handleTabClick with contacts activeTab', () => {
    const activeTab = 'contacts';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierContactsGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierContactsGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierContactsGetRequest.mock.calls[0][0]).toEqual({ id: props.supplierId });

    props.supplierContactsGetRequest.mock.calls.length = 0;
  });

  it('calls supplierInfoGetRequest in handleTabClick with orders activeTab', () => {
    const activeTab = 'orders';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierOrdersGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierOrdersGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierOrdersGetRequest.mock.calls[0][0]).toEqual({ id: props.supplierId });

    props.supplierOrdersGetRequest.mock.calls.length = 0;
  });

  it('calls supplierInfoGetRequest in handleTabClick with pricelist activeTab', () => {
    const activeTab = 'pricelist';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierPriceListGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierPriceListGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierPriceListGetRequest.mock.calls[0][0]).toEqual({
      params: [{
        id: props.supplierId
      }]
    });

    props.supplierPriceListGetRequest.mock.calls.length = 0;
  });

  it('calls supplierInfoGetRequest in handleTabClick with notes activeTab', () => {
    const activeTab = 'notes';
    const component = shallow(<PurchaseSupplierTabs { ...props } />);

    props.supplierNotesGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.supplierNotesGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierNotesGetRequest.mock.calls[0][0]).toEqual({ id: props.supplierId });

    props.supplierNotesGetRequest.mock.calls.length = 0;
  });
});
