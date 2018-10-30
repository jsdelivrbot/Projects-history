import paymentTerms from 'redux-base/reducers/settings/system/paymentTerms';
import {
  PAY_TERMS_GET_PARALLEL,
  PAY_TERMS_SAVE,
  PAY_TERMS_UPDATE,
  PAY_TERMS_DELETE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('paymentTerms reducer', () => {
  const initialState = {
    data: [],
    from: [],
    loadingPage: false,
    needReloadPayTerms: false
  };

  it('handles PAY_TERMS_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: PAY_TERMS_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_UPDATE_REQUEST action type', () => {
    const action = {
      type: PAY_TERMS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_DELETE_REQUEST action type', () => {
    const action = {
      type: PAY_TERMS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_SAVE_REQUEST action type', () => {
    const action = {
      type: PAY_TERMS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadPayTerms = false;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_SAVE_SUCCESS: action type', () => {
    const action = {
      type: PAY_TERMS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadPayTerms = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_DELETE_SUCCESS: action type', () => {
    const action = {
      type: PAY_TERMS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadPayTerms = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_UPDATE_SUCCESS: action type', () => {
    const action = {
      type: PAY_TERMS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadPayTerms = true;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles PAY_TERMS_GET_PARALLEL_SUCCESS: action type', () => {
    const action = {
      type: PAY_TERMS_GET_PARALLEL.SUCCESS,
      data: [{
        from: 'Some Data'
      }, {
        from: 'Some Data'
      }]
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadPayTerms = false;
    state.data = action.data[0];
    state.from = action.data[1].from;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles ERROR: action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(paymentTerms(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(paymentTerms(initialState, {})).toEqual(initialState);
  });
});
