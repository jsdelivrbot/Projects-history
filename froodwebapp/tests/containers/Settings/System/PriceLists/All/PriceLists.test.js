import { PriceLists } from 'containers/Settings/System/PriceLists/All/PriceLists';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PriceLists', () => {
  const props = {
    loadingPage: false,
    priceLists: [{
      id: 1,
      name: 'name of first price list',
      code: 'code of first price list'
    }, {
      id: 2,
      name: 'name of second price list',
      code: 'code of second price list'
    }],
    priceListsGetRequest: jest.fn(),
    push: jest.fn()
  };

  it('renders the PriceLists component', () => {
    const component = shallow(<PriceLists { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PriceLists', () => {
    const component = shallow(<PriceLists { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls push function in handleEdit and handles right string', () => {
    const e = {
      target: {
        id: 1,
        value: 'Some value'
      }
    };
    const component = shallow(<PriceLists { ...props } />);
    const pushedString = '/settings/system/price-lists/1/code of first price list';

    component.instance().handleEdit(e);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toBe(pushedString);
  });

  it('calls handleSearchChange function and changes state', () => {
    const value = 'Search value';
    const component = shallow(<PriceLists { ...props } />);

    component.instance().handleSearchChange(value);

    expect(component.state('searchValue')).toBe(value);
  });
});
