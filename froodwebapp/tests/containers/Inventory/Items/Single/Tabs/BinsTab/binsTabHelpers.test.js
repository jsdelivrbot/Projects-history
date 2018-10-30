import handleEdit from 'containers/Inventory/Items/Single/Tabs/BinsTab/binsTabHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('handleEdit', () => {
  it('renders the handleEdit component', () => {
    const component = shallow(<handleEdit />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of handleEdit', () => {
    const component = shallow(<handleEdit />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
