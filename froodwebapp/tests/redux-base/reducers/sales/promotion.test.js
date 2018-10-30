import promotion from 'redux-base/reducers/sales/promotion';
import {
  PROMOTION_GET,
  PROMOTION_SAVE,
  PROMOTION_UPDATE,
  ITEM_INFO_GET,
  BUNDLE_INFO_GET,
  ERROR
} from 'redux-base/actions';
import MockDate from 'mockdate';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('promotion reducer', () => {
  MockDate.set('10/24/2017');
  const initialState = {
    promotionData: {
      qty: null,
      conditionQty: null,
      forFirstPurchase: false,
      forSingleTime: false,
      requireEndDate: false,
      requireMinumumPurchase: false,
      value: '',
      startDate: new Date(),
      endDate: new Date(),
      qualifyingOrder: null,
    },
    loadingPage: false,
    successSave: false,
    skuData: {},
  };

  it('handles PROMOTION_GET_REQUEST action type', () => {
    const action = {
      type: PROMOTION_GET.REQUEST
    };

    const state = cloneDeep(initialState);

    state.loadingPage = true;
    state.successSave = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles PROMOTION_SAVE_REQUEST action type', () => {
    const action = {
      type: PROMOTION_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);

    state.loadingPage = true;
    state.successSave = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles PROMOTION_UPDATE_REQUEST action type', () => {
    const action = {
      type: PROMOTION_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);

    state.loadingPage = true;
    state.successSave = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles PROMOTION_GET_SUCCESS action type', () => {
    const action = {
      type: PROMOTION_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;
    state.promotionData = action.data;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles PROMOTION_SAVE_SUCCESS action type', () => {
    const action = {
      type: PROMOTION_SAVE.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;
    state.successSave = true;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles PROMOTION_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PROMOTION_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;
    state.successSave = true;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_GET.SUCCESS
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_GET.SUCCESS
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);

    state.loadingPage = false;

    expect(promotion(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    const action = {
      type: ''
    };

    expect(promotion(initialState, action)).toEqual(initialState);
  });
  MockDate.reset();
});
