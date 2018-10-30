import PaymentTerms from 'containers/Settings/System/PaymentTerms/PaymentTerms';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PaymentTerms', () => {
  it('renders the PaymentTerms component', () => {
    const component = shallow(<PaymentTerms />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PaymentTerms', () => {
    const component = shallow(<PaymentTerms />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
