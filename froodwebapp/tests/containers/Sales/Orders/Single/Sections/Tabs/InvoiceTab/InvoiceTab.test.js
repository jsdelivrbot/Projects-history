import { InvoiceTab } from 'containers/Sales/Orders/Single/Sections/Tabs/InvoiceTab/InvoiceTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('InvoiceTab', () => {
  const props = {
    data: []
  };

  it('renders the InvoiceTab component', () => {
    const component = shallow(<InvoiceTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of InvoiceTab', () => {
    const component = shallow(<InvoiceTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
