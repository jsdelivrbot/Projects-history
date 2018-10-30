import { BlackoutTab } from 'containers/Settings/Sales/Fulfilment/Single/Tabs/Blackout/BlackoutTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('BlackoutTab', () => {
  const props = {
    loadingPage: false,
    needReloadHolidays: false,
    readonly: false,
    holidays: [],
    fulfilmentId: '1',
    holidaysGetRequest: jest.fn(),
    holidaySaveRequest: jest.fn(),
    holidayDeleteRequest: jest.fn()
  };
  const DATE_TO_USE = new Date('2016');
  const _Date = Date;
  global.Date = jest.fn(() => DATE_TO_USE);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;

  it('renders the BlackoutTab component', () => {
    const component = shallow(<BlackoutTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of BlackoutTab', () => {
    const component = shallow(<BlackoutTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls holidaySaveRequest in handleSave with correct param', () => {
    const holiday = {
      startDate: '1 september',
      endDate: '31 august'
    };
    const component = shallow(<BlackoutTab { ...props } />);
    component.instance().handleSave(holiday);

    expect(props.holidaySaveRequest.mock.calls.length).toBe(1);

    expect(props.holidaySaveRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      payload: holiday
    });
  });

  it('calls holidayDeleteRequest in handleDeleteRow with correct param', () => {
    const e = {
      target: {
        id: '1'
      }
    };
    const component = shallow(<BlackoutTab { ...props } />);
    component.instance().handleDeleteRow(e);

    expect(props.holidayDeleteRequest.mock.calls.length).toBe(1);

    expect(props.holidayDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      holidayId: e.target.id
    });
  });
});
