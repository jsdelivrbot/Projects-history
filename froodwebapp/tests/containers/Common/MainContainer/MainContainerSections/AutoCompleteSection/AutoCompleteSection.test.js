import AutoCompleteSection from 'containers/Common/MainContainer/MainContainerSections/AutoCompleteSection/AutoCompleteSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AutoCompleteSection', () => {
  const props = {
    loadingAutoComplete: false,
    renderItem: jest.fn(),
    inputPlaceholder: 'SKU',
    autocomplete: ['First SKU', 'Inventory'],
    keyword: 'Jack Sparrow',
    searchRequest: jest.fn(),
    getAllItemsRequest: jest.fn()
  };

  it('renders the AutoCompleteSection component', () => {
    const component = shallow(<AutoCompleteSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AutoCompleteSection', () => {
    const component = shallow(<AutoCompleteSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls searchRequest function in handleSearch function with correct param', () => {
    const component = shallow(<AutoCompleteSection { ...props } />);
    component.instance().handleSearch('event', 'value');

    expect(props.searchRequest.mock.calls.length).toBe(1);

    expect(props.searchRequest.mock.calls[0][0]).toEqual({
      payload: 'value'
    });
  });

  it('calls getAllItemsRequest function in handleSelect function with correct param', () => {
    const component = shallow(<AutoCompleteSection { ...props } />);
    component.instance().handleSelect('id');

    expect(props.getAllItemsRequest.mock.calls.length).toBe(1);

    expect(props.getAllItemsRequest.mock.calls[0][0]).toEqual({
      id: 'id',
      limit: 40,
      offset: 0
    });
    props.searchRequest.mock.calls.length = 0;
  });

  it('calls searchRequest function in handleCloseResultsModal function with empty search field', () => {
    const component = shallow(<AutoCompleteSection { ...props } />);
    component.instance().handleCloseResultsModal();

    expect(props.searchRequest.mock.calls.length).toBe(1);

    expect(props.searchRequest.mock.calls[0][0]).toEqual({
      payload: ''
    });
  });
});
