import { prepareOrder } from 'containers/Purchase/Orders/Single/orderHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StockCount', () => {
  const props = {
    formData: {
      billingAddress: {
        id: 1,
        addressId: 15
      },
      shippingAddress: {
        id: 1,
        addressId: 15
      },
      paymentTerms: {
        id: 1
      },
      details: [{
        sku: 'sku',
        qty: 10,
        discount: 'discount'
      }],
      vendorNotes: 'Vendor notes',
      internalNotes: 'Internal notes',
      vendor: 'Vendor',
      date: 'Some date',
      deliveryDate: 'Delivery date',
      value: 'Form values'
    }
  };
  it('renders the prepareOrder component', () => {
    const component = shallow(<prepareOrder { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of prepareOrder', () => {
    const component = shallow(<prepareOrder { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
