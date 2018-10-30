import contactsTabHelpers from 'containers/Purchase/Suppliers/Single/Tabs/ContactsTab/contactsTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('contactsTabHelpers', () => {
  const props = {
    handleActivate: jest.fn(),
    handleDeactivate: jest.fn()
  };

  it('renders the contactsTabHelpers component', () => {
    const component = shallow(<contactsTabHelpers { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of contactsTabHelpers', () => {
    const component = shallow(<contactsTabHelpers { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
