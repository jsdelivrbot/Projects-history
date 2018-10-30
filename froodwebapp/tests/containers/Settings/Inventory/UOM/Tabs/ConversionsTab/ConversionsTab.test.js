import { ConversionsTab } from 'containers/Settings/Inventory/UOM/Tabs/ConversionsTab/ConversionsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ConversionsTab', () => {
  const props = {
    loadingPage: false,
    needReloadUOMConversions: false,
    uom: [],
    conversions: [],
    uomConversionsGetRequest: jest.fn(),
    uomConversionsSaveRequest: jest.fn(),
    uomConversionsUpdateRequest: jest.fn(),
    uomConversionsDeleteRequest: jest.fn()
  };

  it('renders the ConversionsTab component', () => {
    const component = shallow(<ConversionsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ConversionsTab', () => {
    const component = shallow(<ConversionsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls uomConversionsSaveRequest in handleSave with correct param', () => {
    const data = {
      fromQty: 10,
      toQty: 15,
      toId: 1
    };
    const selectedUOMId = '1';
    const component = shallow(<ConversionsTab { ...props } />);
    component.setState({
      selectedUOMId
    });
    component.instance().handleSave(data);

    expect(props.uomConversionsSaveRequest.mock.calls.length).toBe(1);

    expect(props.uomConversionsSaveRequest.mock.calls[0][0]).toEqual({
      id: selectedUOMId,
      payload: {
        fromQty: data.fromQty,
        toQty: data.toQty,
        toId: data.toId,
      }
    });
  });

  it('calls uomConversionsDeleteRequest in handleDeactivate with correct param', () => {
    const e = {
      target: {
        id: '1'
      }
    };
    const selectedUOMId = '1';
    const component = shallow(<ConversionsTab { ...props } />);
    component.setState({
      selectedUOMId
    });
    component.instance().handleDeactivate(e);

    expect(props.uomConversionsDeleteRequest.mock.calls.length).toBe(1);

    expect(props.uomConversionsDeleteRequest.mock.calls[0][0]).toEqual({
      id: selectedUOMId,
      mappingId: Number(e.target.id),
    });
  });

  it('calls uomConversionsDeleteRequest in handleUOMSelect with correct param', () => {
    const uomId = '1';
    const component = shallow(<ConversionsTab { ...props } />);
    component.setState({
      selectedUOMId: uomId
    });
    component.instance().handleUOMSelect(uomId);

    expect(props.uomConversionsGetRequest.mock.calls.length).toBe(1);

    expect(props.uomConversionsGetRequest.mock.calls[0][0]).toEqual({
      id: uomId
    });
  });
});
