import transporters from 'redux-base/reducers/settings/sales/fulfilment';
import {
  TRANSPORTERS_GET,
  TRANSPORTERS_UPDATE,
  FULFILMENT_ITEM_GET_PARALLEL,
  SLOTS_GET,
  SLOTS_SAVE,
  SLOTS_UPDATE,
  SLOTS_STATUS_UPDATE,
  SLOTS_DELETE,
  HOLIDAYS_GET,
  HOLIDAYS_SAVE,
  HOLIDAYS_DELETE,
  EXTRAS_GET,
  EXTRAS_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('transporters reducer', () => {
  const initialState = {
    fulfilments: [],
    slots: [],
    holidays: [],
    loadingPage: false,
    needReloadSlots: false,
    needReloadHolidays: false,
    needReloadTransporters: false,
  };

  it('handles PROMOTION_GET_REQUEST action type', () => {
    const action = {
      type: TRANSPORTERS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles TRANSPORTERS_UPDATE_REQUEST action type', () => {
    const action = {
      type: TRANSPORTERS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles FULFILMENT_ITEM_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: FULFILMENT_ITEM_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_GET_REQUEST action type', () => {
    const action = {
      type: SLOTS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_UPDATE_REQUEST action type', () => {
    const action = {
      type: SLOTS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_STATUS_UPDATE action type', () => {
    const action = {
      type: SLOTS_STATUS_UPDATE
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_DELETE_REQUEST action type', () => {
    const action = {
      type: SLOTS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_GET_REQUEST action type', () => {
    const action = {
      type: HOLIDAYS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_DELETE_REQUEST action type', () => {
    const action = {
      type: HOLIDAYS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles EXTRAS_GET_REQUEST action type', () => {
    const action = {
      type: EXTRAS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles EXTRAS_UPDATE_REQUEST action type', () => {
    const action = {
      type: EXTRAS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadSlots = false;
    state.needReloadHolidays = false;
    state.needReloadTransporters = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles TRANSPORTERS_GET_SUCCESS action type', () => {
    const action = {
      type: TRANSPORTERS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.fulfilments = action.data;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles FULFILMENT_ITEM_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: FULFILMENT_ITEM_GET_PARALLEL.SUCCESS,
      data: ['slots', 'extras']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.slots = action.data[0];
    state.extras = action.data[1];

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_GET_SUCCESS action type', () => {
    const action = {
      type: SLOTS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.slots = action.data;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_GET_SUCCESS action type', () => {
    const action = {
      type: HOLIDAYS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.holidays = action.data;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles EXTRAS_GET_SUCCESS action type', () => {
    const action = {
      type: EXTRAS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.extras = action.data;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_SAVE_SUCCESS action type', () => {
    const action = {
      type: SLOTS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadSlots = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_SAVE_SUCCESS action type', () => {
    const action = {
      type: HOLIDAYS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadHolidays = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles TRANSPORTERS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TRANSPORTERS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTransporters = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_UPDATE.SUCCESS action type', () => {
    const action = {
      type: SLOTS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadSlots = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_STATUS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: SLOTS_STATUS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadSlots = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles EXTRAS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: EXTRAS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles SLOTS_DELETE_SUCCESS action type', () => {
    const action = {
      type: SLOTS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadSlots = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles HOLIDAYS_DELETE_SUCCESS action type', () => {
    const action = {
      type: HOLIDAYS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadHolidays = true;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(transporters(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(transporters(initialState, {})).toEqual(initialState);
  });
});
