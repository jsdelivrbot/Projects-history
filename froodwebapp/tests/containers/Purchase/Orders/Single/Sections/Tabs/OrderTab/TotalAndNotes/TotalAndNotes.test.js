import { TotalAndNotes } from 'containers/Purchase/Orders/Single/Sections/Tabs/OrderTab/TotalAndNotes/TotalAndNotes';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TotalAndNotes', () => {
  const props = {
    data: [],
    shipping: 1,
    adjustment: 1,
    currency: 'currency'
  };

  it('renders the TotalAndNotes component', () => {
    const component = shallow(<TotalAndNotes { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TotalAndNotes', () => {
    const component = shallow(<TotalAndNotes { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
