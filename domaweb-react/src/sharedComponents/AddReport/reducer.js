/*
 *
 * AddReport reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_SYMBOLS, LOAD_SYMBOLS_SUCESS, LOAD_SYMBOLS_FAILED,
  SUMBIT_REPORT, SUMBIT_REPORT_SUCESS, SUMBIT_REPORT_FAILED,
} from './constants';

const initialState = fromJS({
  symbols: 0,
});


// Customers reducer

function symbolsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SYMBOLS:
      return state;
    case LOAD_SYMBOLS_SUCESS:
      return state.set('symbols', action.symbols);
    case LOAD_SYMBOLS_FAILED:
      return state.set('unitserrormsg', fromJS(action.errormsg));
    case SUMBIT_REPORT:
      return state;
    case SUMBIT_REPORT_SUCESS:
      return state;
    case SUMBIT_REPORT_FAILED:
      return state.set('unitserrormsg', fromJS(action.errormsg));
    default:
      return state;
  }
}

export default symbolsReducer;
