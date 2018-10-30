import { InvoiceTotalAndNotes } from 'containers/Sales/Orders/Single/Sections/Tabs/InvoiceTab/InvoiceTotalAndNotes/InvoiceTotalAndNotes';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('InvoiceTotalAndNotes', () => {
  const props = {
    data: {}
  };

  it('renders the InvoiceTotalAndNotes component', () => {
    const component = shallow(<InvoiceTotalAndNotes { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of InvoiceTotalAndNotes', () => {
    const component = shallow(<InvoiceTotalAndNotes { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
