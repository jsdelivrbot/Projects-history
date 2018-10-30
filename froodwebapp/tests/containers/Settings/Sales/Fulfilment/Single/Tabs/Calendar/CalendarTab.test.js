import { CalendarTab } from 'containers/Settings/Sales/Fulfilment/Single/Tabs/Calendar/CalendarTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('CalendarTab', () => {
  const props = {
    loadingPage: false,
    needReloadSlots: false,
    readonly: false,
    slots: [],
    activeDelivery: false,
    fulfilmentId: '1',
    slotsGetRequest: jest.fn(),
    slotsUpdateRequest: jest.fn(),
    slotItemSaveRequest: jest.fn(),
    slotStatusUpdateRequest: jest.fn(),
    slotItemDeleteRequest: jest.fn()
  };

  it('renders the CalendarTab component', () => {
    const component = shallow(<CalendarTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of CalendarTab', () => {
    const component = shallow(<CalendarTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls slotStatusUpdateRequest in handleUpdateSlotStatus with correct param', () => {
    const isActive = false;
    const id = '1';
    const component = shallow(<CalendarTab { ...props } />);
    component.instance().handleUpdateSlotStatus(isActive, id);

    expect(props.slotStatusUpdateRequest.mock.calls.length).toBe(1);

    expect(props.slotStatusUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      payload: {
        id,
        isActive
      }
    });
  });

  it('calls slotStatusUpdateRequest in handleSave with correct param', () => {
    const slot = {
      deliveries: 'deliveries',
      isDeliveryLimited: false
    };
    const component = shallow(<CalendarTab { ...props } />);
    component.setState({
      choosenSlot: 'slot',
      modalData: {
        id: '1'
      }
    });
    component.instance().handleSave(slot);

    expect(props.slotsUpdateRequest.mock.calls.length).toBe(1);

    expect(props.slotsUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      payload: {
        id: 'slot',
        slots: [{
          id: '1',
          deliveries: slot.deliveries,
          isDeliveryLimited: slot.isDeliveryLimited
        }]
      }
    });
  });
});
